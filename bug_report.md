# Postman Clone - Bug Investigation & Analysis Report

This report outlines the bugs identified in the application's tab section, URL inputs, and request execution logic. Below is a detailed breakdown of each issue, why it occurs in the codebase, and the recommended solutions to resolve them.

---

## 1. Initial Default Tab is Hidden/Inaccessible on Page Load
### Description
When the user first opens the application, they are greeted by a blank "Unplugged" screen with keyboard shortcuts instead of seeing the default "Request" tab. The tab bar and request editor are completely hidden.

### Root Cause
In [useRequestStore.ts](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/store/useRequestStore.ts#L47-L57), the store initializes the `tabs` array with a default request tab:
```typescript
  tabs: [
    {
      id: nanoid(),
      title: "Request",
      method: "GET",
      url: "https://echo.hoppscotch.io",
      unsavedChanges: false,
    },
  ],
  activeTabId: null, // 👈 Initialized to null
```
Because the default tab's ID is generated using `nanoid()` inline and `activeTabId` is initialized to `null`, there is a mismatch. 

In [request-playground.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/components/request-playground.tsx#L94-L114), the UI performs an early return if no active tab is found:
```typescript
  const activeTab = tabs.find((t) => t.id === activeTabId);
  ...
  if (!activeTab) {
    return (
      <div className="flex space-y-4 flex-col h-full items-center justify-center">
         {/* Unplugged screen with keyboard shortcuts */}
      </div>
    );
  }
```
Since `activeTabId` is `null` initially, the editor is not rendered at all. The user can only see the tab bar if they explicitly press `Ctrl+Shift+N` (which triggers `addTab` and updates `activeTabId`) or load a request from a collection.

### Recommended Solution
Initialize `activeTabId` to the default tab's ID by generating the ID outside the store declaration:
```typescript
const defaultTabId = nanoid();

export const useRequestPlaygroundStore = create<PlaygroundState>((set) => ({
  tabs: [
    {
      id: defaultTabId,
      title: "Request",
      method: "GET",
      url: "https://echo.hoppscotch.io",
      unsavedChanges: false,
    },
  ],
  activeTabId: defaultTabId, // 👈 Link to default tab
  ...
```

---

## 2. No Way to Configure / Load Default URL
### Description
The environment variable `NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL` (set to `https://api.cipherion.in` in `.env`) is configured, but:
1. The default "Request" tab always loads `https://echo.hoppscotch.io`.
2. Any newly added tabs (via clicking `+` or using the shortcut `Ctrl+Shift+N`) always initialize with an empty URL (`""`).

### Root Cause
The environment variable is never imported or assigned in the Zustand store. In [useRequestStore.ts](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/store/useRequestStore.ts), the default tab uses a hardcoded string, and `addTab` uses `url: ""`.

### Recommended Solution
Import `env` from `@/lib/env` in the store, and initialize the default tab and new tab URL values with `env.NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL`:
```typescript
import { env } from "@/lib/env";

const defaultUrl = env.NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL || "";

// In tabs initialization:
url: defaultUrl,

// In addTab action:
const newTab: RequestTab = {
  id: nanoid(),
  title: "Untitled",
  method: "GET",
  url: defaultUrl, // 👈 Default URL for new tabs
  ...
};
```

---

## 3. URL and Method "Not Getting Changed" on Send
### Description
If the user opens a saved request, changes the method (e.g., from `GET` to `POST`) or edits the URL in the input field, and then clicks **Send**, the request executes using the **old** database values instead of the updated inputs in the UI.

### Root Cause
1. In [request-bar.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/components/request-bar.tsx#L26), the mutation hook is initialized with the database request ID:
   ```typescript
   const { mutateAsync, isPending, isError } = useRunRequest(tab?.requestId!);
   ```
2. When the user clicks **Send**, it triggers `run(requestId)` server action in [index.ts](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/actions/index.ts#L113).
3. The `run` action fetches the request **from the database**, ignoring the current Zustand client-side state:
   ```typescript
   const request = await db.request.findUnique({
     where: { id: requestId }
   });
   // Executes with database request.url and request.method...
   ```
4. Since changes in the URL input and method dropdown only update the local store (unless the user manually saves with `Ctrl+S`), the executed request does not reflect the user's latest inputs.

### Recommended Solution
Instead of executing requests solely via `run(requestId)`, the client should pass the current, modified method, URL, headers, params, and body from the tab state. 
- Use the existing `runDirect` server action in [index.ts](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/actions/index.ts#L191) which accepts custom `requestData`:
  ```typescript
  export async function runDirect(requestData: {
    id: string;
    method: string;
    url: string;
    headers?: Record<string, string>;
    parameters?: Record<string, any>;
    body?: any;
  })
  ```
- Modify the `useRunRequest` mutation to accept these inputs and call `runDirect` to run the request using the live UI values.

---

## 4. Unsaved Requests Crash on Send
### Description
When a user opens a new tab (which has no database representation, so `tab.requestId` is `undefined`) and clicks **Send**, the request fails to execute and triggers a database/server error.

### Root Cause
Since `tab.requestId` is `undefined`, clicking **Send** triggers `run(undefined)`. The backend tries to find a request in the database where `id = undefined` and throws:
`Request with id undefined not found`.
Because `RequestRun` has a database foreign key constraint requiring a valid `requestId`, we cannot use the standard database-driven execution flow for unsaved tabs.

### Recommended Solution
Introduce a server action `runUnsavedRequest` that executes the HTTP request directly using `sendRequest` and returns a mock/temporary `RequestRun` object to the frontend client without inserting it into the database:
```typescript
export async function runUnsavedRequest(requestData: {
  method: string;
  url: string;
  headers?: Record<string, string>;
  parameters?: Record<string, any>;
  body?: any;
}) {
  const result = await sendRequest({
    method: requestData.method,
    url: requestData.url,
    headers: requestData.headers,
    params: requestData.parameters,
    body: requestData.body
  });

  return {
    success: true,
    requestRun: {
      id: "unsaved",
      status: result.status || 0,
      statusText: result.statusText || (result.error ? 'Error' : null),
      headers: result.headers || {},
      body: result.data ? (typeof result.data === 'string' ? result.data : JSON.stringify(result.data)) : null,
      durationMs: result.duration || 0,
      createdAt: new Date().toISOString()
    },
    result
  };
}
```
Update `useRunRequest` to call this action for unsaved tabs.

---

## 5. Headers, Query Parameters, and Body Lost on Save
### Description
When saving a newly created tab to a collection for the first time, all parameters, headers, and request body that the user added are completely lost. Only the name, method, and URL are stored in the database.

### Root Cause
In [request-playground.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/components/request-playground.tsx#L124-L129), `requestData` is populated using `getCurrentRequestData()`, which only returns `name`, `method`, and `url`.
In [add-request-modal.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/collections/components/add-request-modal.tsx#L102-L106), the `handleSubmit` function only calls `mutateAsync` with:
```typescript
      await mutateAsync({
        url: requestUrl.trim(),
        method: requestData.method,
        name: requestName.trim(),
      });
```
This entirely drops `headers`, `parameters`, and `body` fields from the tab state!

### Recommended Solution
1. Update `getCurrentRequestData` in `request-playground.tsx` to return the complete tab state (`body`, `headers`, `parameters`).
2. Update `SaveRequestToCollectionModal` to accept the full request data in its props and pass them into `mutateAsync`.

---

## 6. Missing PATCH Method Option and Styling Support
### Description
The DB schema supports `PATCH` as part of the `REST_METHOD` enum, and the collection sidebar includes styling mapping for `PATCH` (`text-orange-500`). However, the method selection dropdown in the main request editor does not offer `PATCH`.

### Root Cause
1. In [request-bar.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/request/components/request-bar.tsx#L51-L60), there is no `<SelectItem>` for `PATCH`.
2. The `requestColorMap` in both `request-bar.tsx` and `tab-bar.tsx` lacks key mapping for `PATCH`.

### Recommended Solution
- Add `<SelectItem value="PATCH" className="text-orange-500">PATCH</SelectItem>` to the Select component in `RequestBar`.
- Add `PATCH: "text-orange-500"` to `requestColorMap` in both components.

---

## 7. UI Glitch: Search Icon and Placeholder for URL Preview Input
### Description
In the "Save as" modal, the URL input field displays a Search magnifying glass icon and has the placeholder `"Search"`, which is highly counter-intuitive.

### Root Cause
In [add-request-modal.tsx](file:///f:/Projects/RESUME_PROJECTS/postman-clone/src/modules/collections/components/add-request-modal.tsx#L251-L260), the URL input is rendered using:
```typescript
        <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search"
              ...
```

### Recommended Solution
Replace the `Search` icon with a `Link` or `Globe` icon (or remove it entirely) and change the placeholder to `"Request URL..."` or similar descriptive text.

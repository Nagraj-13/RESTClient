import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/Layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import React from 'react'
import LandingPage from '@/components/landing-page'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()

  if (!user) {
    return <LandingPage />
  }

  const workspace = await initializeWorkspace()

  return (
    <>
      {/* @ts-ignore */}
      <Header user={user} workspace={workspace.workspace!} />
      <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden bg-zinc-950'>
        <div className="flex h-full w-full">
          <div className="flex-1 bg-zinc-950">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default RootLayout
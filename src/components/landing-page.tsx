"use client";

import React, { useState } from "react";
import { 
  Unplug, 
  Send, 
  Layers, 
  Activity, 
  Folder, 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ChevronRight,
  Terminal,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("GET");
  const [url, setUrl] = useState("https://api.github.com/repos/vercel/next.js");
  const [responseCode, setResponseCode] = useState(200);
  const [responseTime, setResponseTime] = useState(124);
  const [responseSize, setResponseSize] = useState("4.2 KB");
  const [isLoading, setIsLoading] = useState(false);
  const [responseBody, setResponseBody] = useState<any>({
    name: "next.js",
    full_name: "vercel/next.js",
    description: "The React Framework",
    stargazers_count: 120542,
    forks_count: 26853,
    open_issues_count: 1485,
    license: {
      key: "mit",
      name: "MIT License"
    }
  });

  const handleSendSimulate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (url.includes("github.com")) {
        setResponseCode(200);
        setResponseTime(Math.floor(Math.random() * 80) + 80);
        setResponseSize("4.2 KB");
        setResponseBody({
          name: "next.js",
          full_name: "vercel/next.js",
          description: "The React Framework",
          stargazers_count: 120542,
          forks_count: 26853,
          open_issues_count: 1485,
          license: {
            key: "mit",
            name: "MIT License"
          }
        });
      } else {
        setResponseCode(404);
        setResponseTime(Math.floor(Math.random() * 50) + 40);
        setResponseSize("120 B");
        setResponseBody({
          error: "Not Found",
          message: "Could not find resource on simulation host"
        });
      }
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: "Tabbed Workspace",
      description: "Manage multiple requests concurrently in a fast, tabbed workspace with dedicated configurations."
    },
    {
      icon: <Folder className="w-6 h-6 text-blue-400" />,
      title: "Nested Collections",
      description: "Keep your workspace clean and organized. Structure requests inside nested collections and environments."
    },
    {
      icon: <Activity className="w-6 h-6 text-green-400" />,
      title: "Real-time Metrics",
      description: "Track precise latency metrics, size, status, and custom response details on every execution."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Unsaved Playgrounds",
      description: "Run ad-hoc requests and debug API endpoints quickly without saving to collections or database clutter."
    },
    {
      icon: <Terminal className="w-6 h-6 text-pink-400" />,
      title: "Native Performance",
      description: "Designed on an optimized server layer, delivering zero lag and ultra-responsive request dispatching."
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: "Header & Parameter Maps",
      description: "Edit request headers, search parameters, and request body payload dynamically with zero friction."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
              <Unplug size={22} className="animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              PostBoy
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#playground" className="hover:text-white transition-colors">Interactive Demo</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-900">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200">
                Get Started <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Supercharged Developer API Client
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            The modern API client <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              for speed and precision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
          >
            Send HTTP requests, organize nested collections, and trace response times with lightning-fast speeds. PostBoy delivers a sleek, local-first API playground with absolute zero bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/sign-in">
              <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all text-base rounded-xl">
                Open Workspace <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#playground">
              <Button size="lg" variant="outline" className="h-12 px-8 border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:text-white hover:bg-zinc-800/80 text-base rounded-xl backdrop-blur-sm">
                Try Sandbox Demo <Play className="w-4 h-4 ml-2 fill-zinc-400 group-hover:fill-white text-zinc-400" />
              </Button>
            </a>
          </motion.div>

          {/* Hero UI Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.4 }}
            className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl shadow-indigo-500/5 max-w-5xl mx-auto overflow-hidden group"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 pointer-events-none" />
            <div className="relative rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900/60 backdrop-blur-xl">
              {/* Window controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/70">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-zinc-500 font-mono ml-4">Workspace Root / GET - GitHub API</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping mr-1" />
                  API Active
                </div>
              </div>

              {/* Simulated UI layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 min-h-[380px] text-left">
                {/* Left panel mockup */}
                <div className="col-span-1 border-r border-zinc-800 bg-zinc-950/50 p-4 space-y-4 hidden md:block">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Collections</span>
                    <div className="flex items-center space-x-2 text-xs py-1.5 text-zinc-300 font-medium px-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <Folder className="w-4 h-4 text-indigo-400" />
                      <span className="truncate">GitHub Integration</span>
                    </div>
                    <div className="pl-4 space-y-1 mt-1">
                      <div className="flex items-center space-x-2 text-xs py-1 text-zinc-400 hover:text-zinc-200">
                        <span className="text-[10px] font-bold text-green-500">GET</span>
                        <span className="truncate">Get Repository</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs py-1 text-zinc-400 hover:text-zinc-200">
                        <span className="text-[10px] font-bold text-indigo-500">POST</span>
                        <span className="truncate">Create Issue</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs py-1 text-zinc-400 hover:text-zinc-200">
                        <span className="text-[10px] font-bold text-orange-500">PATCH</span>
                        <span className="truncate">Update Metadata</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      <span>History</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] py-1 text-zinc-500">
                        <span className="text-green-500 font-bold">GET</span>
                        <span className="truncate max-w-[100px]">/repos/vercel</span>
                        <span>200 OK</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right workspace mockup */}
                <div className="col-span-3 p-4 flex flex-col justify-between space-y-4 bg-zinc-900/20">
                  <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-lg border border-zinc-800">
                    <span className="text-xs font-bold text-green-500 px-3 py-1 rounded bg-green-500/10">GET</span>
                    <div className="flex-1 text-xs text-zinc-300 font-mono select-all truncate px-2">
                      https://api.github.com/repos/vercel/next.js
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium h-7 rounded px-3">
                      Send
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {/* Params/Body */}
                    <div className="border border-zinc-800/80 rounded-lg p-3 bg-zinc-950/30 flex flex-col">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                        <span className="text-xs font-semibold text-zinc-400">Request Headers</span>
                        <span className="text-[10px] text-zinc-500 font-mono">JSON</span>
                      </div>
                      <pre className="text-xs text-zinc-400 font-mono flex-1 overflow-auto">
{`{
  "Accept": "application/vnd.github+json",
  "User-Agent": "PostBoyClient/1.0"
}`}
                      </pre>
                    </div>

                    {/* Output */}
                    <div className="border border-zinc-800/80 rounded-lg p-3 bg-zinc-950/30 flex flex-col">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                        <span className="text-xs font-semibold text-zinc-400">Response</span>
                        <div className="flex items-center space-x-2 text-[10px]">
                          <span className="text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded">200 OK</span>
                          <span className="text-zinc-500">124 ms</span>
                        </div>
                      </div>
                      <pre className="text-xs text-indigo-300 font-mono flex-1 overflow-auto max-h-[160px]">
{`{
  "name": "next.js",
  "full_name": "vercel/next.js",
  "stargazers_count": 120542,
  "forks_count": 26853
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-zinc-950/60 border-y border-zinc-900 relative z-10 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Core Capabilities</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Engineered for absolute client productivity
            </p>
            <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
              Every detail is meticulously crafted to support seamless API exploration, debugging, and collection archiving.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 group-hover:scale-105 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-4 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-2">
                    {feature.description}
                  </p>
                </div>
                <div className="flex items-center text-xs text-indigo-400/80 font-semibold group-hover:text-indigo-300 cursor-pointer pt-2">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Sandbox Playground */}
      <section id="playground" className="py-24 z-10 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Context block */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Sandbox Preview</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Try the interactive request editor right here
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                Familiarize yourself with the workspace layout. Toggle REST methods, modify the endpoint URL, and execute the mock dispatcher below to trace how responses load dynamically.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Fast, local sandbox interface simulation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Automatic timing metrics calculations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Visual feedback for client status code results</span>
                </div>
              </div>
            </div>

            {/* Sandbox panel */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-semibold text-zinc-400">Interactive Sandbox</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">sandbox_request_1</div>
                </div>

                <div className="space-y-4">
                  {/* URL / Send Bar */}
                  <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-1.5 border border-zinc-800">
                    <select 
                      value={activeTab} 
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="bg-transparent text-xs font-bold text-indigo-400 focus:outline-none border-none cursor-pointer pl-2 pr-1"
                    >
                      <option value="GET" className="bg-zinc-900 text-green-400">GET</option>
                      <option value="POST" className="bg-zinc-900 text-blue-400">POST</option>
                      <option value="PUT" className="bg-zinc-900 text-yellow-400">PUT</option>
                      <option value="PATCH" className="bg-zinc-900 text-orange-400">PATCH</option>
                      <option value="DELETE" className="bg-zinc-900 text-red-400">DELETE</option>
                    </select>
                    
                    <input 
                      type="text" 
                      value={url} 
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter endpoint URL"
                      className="flex-1 bg-transparent text-xs text-zinc-200 focus:outline-none font-mono px-2"
                    />

                    <Button 
                      onClick={handleSendSimulate}
                      disabled={isLoading || !url}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs h-8 px-4 rounded-md"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      {isLoading ? "Running..." : "Send"}
                    </Button>
                  </div>

                  {/* Headers Setup Mockup */}
                  <div className="border border-zinc-800 bg-zinc-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                      <span className="text-xs font-medium text-zinc-400">Query Parameters</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Key-Value Map</span>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-zinc-400">limit</div>
                        <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-zinc-400">10</div>
                      </div>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="border border-zinc-800 bg-zinc-900/40 rounded-lg p-4 flex flex-col min-h-[200px]">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                      <span className="text-xs font-semibold text-zinc-400">Output Log</span>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className={`font-bold ${responseCode === 200 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"} px-2 py-0.5 rounded`}>
                          {responseCode} {responseCode === 200 ? "OK" : "NOT FOUND"}
                        </span>
                        <span className="text-zinc-500">{responseTime} ms</span>
                        <span className="text-zinc-500">{responseSize}</span>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
                        <div className="w-6 h-6 border-2 border-zinc-700 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-xs text-zinc-400 font-medium">Resolving sandbox host...</span>
                      </div>
                    ) : (
                      <pre className="text-xs text-indigo-300 font-mono flex-1 overflow-auto max-h-[140px] leading-relaxed">
                        {JSON.stringify(responseBody, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 py-24 relative overflow-hidden border-t border-zinc-900 z-10">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to optimize your API workflow?
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Create collections, write mock headers, and execute request pipelines. PostBoy is fully production ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/sign-in">
              <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-base shadow-xl shadow-indigo-600/20">
                Start Requesting <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
          <div className="flex items-center space-x-2.5 mb-4 md:mb-0">
            <Unplug className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-zinc-300">PostBoy</span>
            <span>&copy; {new Date().getFullYear()} PostBoy. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import {
  Cpu,
  Layers,
  ExternalLink,
  Compass,
  Database,
  Radio,
  Server,
  Network,
  Maximize2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface BlueprintCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export function BlueprintCard({ project, onOpenDetails }: BlueprintCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string>("api-gw");

  const architectureNodes = [
    {
      id: "api-gw",
      name: "API Gateway",
      layer: "Ingress",
      protocol: "REST / Reverse Proxy",
      role: "Route dispatch, rate limiting, and unified client entry point",
      icon: <Network className="h-3.5 w-3.5" />,
    },
    {
      id: "auth-svc",
      name: "Auth Service",
      layer: "Core Service",
      protocol: "JWT + Refresh Tokens",
      role: "User authentication, credential validation, and RBAC authorization",
      icon: <Lock className="h-3.5 w-3.5" />,
    },
    {
      id: "resource-svc",
      name: "Resource Service",
      layer: "Core Service",
      protocol: "Google Maps API",
      role: "Geospatial radius queries and dynamic parking slot inventory",
      icon: <Compass className="h-3.5 w-3.5" />,
    },
    {
      id: "booking-svc",
      name: "Booking Service",
      layer: "Core Service",
      protocol: "Stripe Checkout",
      role: "Slot reservation workflows, checkout sessions, and status updates",
      icon: <Cpu className="h-3.5 w-3.5" />,
    },
    {
      id: "rabbitmq",
      name: "RabbitMQ Event Bus",
      layer: "Messaging",
      protocol: "AMQP Protocol",
      role: "Decoupled asynchronous event dispatch across microservices",
      icon: <Radio className="h-3.5 w-3.5" />,
    },
    {
      id: "redis-cache",
      name: "Redis Cache",
      layer: "In-Memory",
      protocol: "Distributed Locks",
      role: "Prevents race conditions on slot reservation and caches geo-data",
      icon: <Layers className="h-3.5 w-3.5" />,
    },
    {
      id: "postgres-db",
      name: "PostgreSQL",
      layer: "Relational DB",
      protocol: "ACID Transactions",
      role: "Financial ledgers, immutable booking history, and user accounts",
      icon: <Database className="h-3.5 w-3.5" />,
    },
    {
      id: "mongo-db",
      name: "MongoDB",
      layer: "Document DB",
      protocol: "Flexible GeoJSON",
      role: "Parking lot layouts, spatial indexing, and live sensor payloads",
      icon: <Server className="h-3.5 w-3.5" />,
    },
  ];

  const currentNode = architectureNodes.find((n) => n.id === activeNode) || architectureNodes[0];

  return (
    <div className="w-full rounded-2xl border-2 border-cyan-500/30 bg-[var(--bg-surface)] overflow-hidden shadow-sm hover:border-cyan-500/60 transition-all relative">
      {/* Blueprint Grid Watermark Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, #06B6D4 1px, transparent 1px), linear-gradient(to bottom, #06B6D4 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Blueprint Header Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 bg-cyan-950/10 px-5 sm:px-7 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06B6D4]" />
          <span className="font-mono text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            SYSTEM BLUEPRINT // 01 • {project.tag}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--fg-muted)]">
            • TOPOLOGY: DISTRIBUTED
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* GitHub Link Placeholder */}
          <span
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs font-mono text-[var(--fg-muted)] hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            title="GitHub link placeholder"
          >
            <span>GitHub</span>
            <span className="text-[10px] text-amber-500 font-bold">[ADD LINK]</span>
          </span>

          {/* Live Link Placeholder */}
          <span
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs font-mono text-[var(--fg-muted)] hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            title="Live demo placeholder"
          >
            <span>Live Demo</span>
            <span className="text-[10px] text-amber-500 font-bold">[ADD LINK]</span>
          </span>
        </div>
      </div>

      {/* Project Overview Content */}
      <div className="relative z-10 p-5 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[var(--fg-primary)]">
              {project.title}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-medium">
              {project.tagline}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] font-sans pt-1">
              {project.description}
            </p>
          </div>

          <button
            onClick={() => onOpenDetails(project)}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-2 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all cursor-pointer shadow-xs"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Open System Specs</span>
          </button>
        </div>

        {/* Blueprint Architecture Diagram Visualizer */}
        <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/5 dark:bg-cyan-950/20 p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Interactive Architecture Diagram
              </span>
              <span className="text-[10px] font-mono text-[var(--fg-muted)]">
                (Click any node to inspect data flow)
              </span>
            </div>
            <div className="text-xs font-mono text-[var(--fg-muted)]">
              AMQP Event Bus + Distributed Cache
            </div>
          </div>

          {/* Architecture Topology Grid */}
          <div className="space-y-3">
            {/* Top Ingress Node */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNode("api-gw")}
                className={`w-full max-w-xs flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-all cursor-pointer ${
                  activeNode === "api-gw"
                    ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] text-cyan-600 dark:text-cyan-300 font-semibold"
                    : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-cyan-500/50 text-[var(--fg-primary)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-cyan-500" />
                  <span className="font-mono text-xs font-medium">API Gateway (Entry)</span>
                </div>
                <span className="font-mono text-[10px] text-cyan-500">Reverse Proxy</span>
              </button>
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center text-cyan-500/40 font-mono text-xs select-none">
              ▼
            </div>

            {/* Core Microservices Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: "auth-svc", name: "Auth Service", tag: "JWT / RBAC", icon: <Lock className="h-3.5 w-3.5" /> },
                { id: "resource-svc", name: "Resource Service", tag: "Google Maps", icon: <Compass className="h-3.5 w-3.5" /> },
                { id: "booking-svc", name: "Booking Service", tag: "Stripe", icon: <Cpu className="h-3.5 w-3.5" /> },
              ].map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setActiveNode(svc.id)}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                    activeNode === svc.id
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] text-cyan-600 dark:text-cyan-300 font-semibold"
                      : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-cyan-500/50 text-[var(--fg-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-cyan-500">{svc.icon}</span>
                    <span className="font-mono text-xs truncate">{svc.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-500 shrink-0">{svc.tag}</span>
                </button>
              ))}
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center text-cyan-500/40 font-mono text-xs select-none">
              ▼
            </div>

            {/* Event Bus & Cache Layer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: "rabbitmq", name: "RabbitMQ Message Broker", tag: "Asynchronous Events", icon: <Radio className="h-3.5 w-3.5" /> },
                { id: "redis-cache", name: "Redis In-Memory Cache", tag: "Distributed Locks", icon: <Layers className="h-3.5 w-3.5" /> },
              ].map((mid) => (
                <button
                  key={mid.id}
                  onClick={() => setActiveNode(mid.id)}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                    activeNode === mid.id
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] text-cyan-600 dark:text-cyan-300 font-semibold"
                      : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-cyan-500/50 text-[var(--fg-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-cyan-500">{mid.icon}</span>
                    <span className="font-mono text-xs truncate">{mid.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-500 shrink-0">{mid.tag}</span>
                </button>
              ))}
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center text-cyan-500/40 font-mono text-xs select-none">
              ▼
            </div>

            {/* Dual Database Persistence Layer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: "postgres-db", name: "PostgreSQL Database", tag: "ACID Ledger & Bookings", icon: <Database className="h-3.5 w-3.5" /> },
                { id: "mongo-db", name: "MongoDB Document Store", tag: "Sensor States & GeoJSON", icon: <Server className="h-3.5 w-3.5" /> },
              ].map((db) => (
                <button
                  key={db.id}
                  onClick={() => setActiveNode(db.id)}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                    activeNode === db.id
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] text-cyan-600 dark:text-cyan-300 font-semibold"
                      : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-cyan-500/50 text-[var(--fg-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-cyan-500">{db.icon}</span>
                    <span className="font-mono text-xs truncate">{db.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-500 shrink-0">{db.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Live Telemetry Inspector */}
          <div className="mt-3 rounded-lg border border-cyan-500/30 bg-[var(--bg-canvas)] p-3 text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                {currentNode.icon}
                <span>NODE SPEC: {currentNode.name}</span>
              </span>
              <span className="text-[10px] text-[var(--fg-muted)]">LAYER: {currentNode.layer}</span>
            </div>
            <p className="text-[var(--fg-muted)] text-[11px] font-sans">
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold mr-1">Function:</span>
              {currentNode.role}
            </p>
            <div className="pt-1 flex items-center gap-2 text-[10px] text-[var(--fg-muted)]">
              <span>Protocol / Driver:</span>
              <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/20">
                {currentNode.protocol}
              </span>
            </div>
          </div>
        </div>

        {/* Deliverables / Architectural Highlights */}
        <div className="space-y-2">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
            Verified Deliverables & Engineering Accomplishments:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--fg-muted)]">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pins Array */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--fg-muted)] mr-1">Stack:</span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-2 py-0.5 text-[11px] font-mono text-[var(--fg-primary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

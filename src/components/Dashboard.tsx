"use client";

import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface text-on_surface font-sans">
      <AppSidebar activeItem="dashboard" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-surface px-10 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex gap-10">
            <Link
              href="#"
              className="rounded-md bg-surface_container_highest px-3 py-1.5 font-semibold text-primary_container"
            >
              MARKET
            </Link>
            <Link
              href="#"
              className="text-on_surface_variant font-semibold hover:text-white"
            >
              PORTFOLIO
            </Link>
            <Link
              href="#"
              className="text-on_surface_variant font-semibold hover:text-white"
            >
              ACADEMY
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="w-6 h-6 bg-surface_container_highest rounded-full" />
            <button className="w-6 h-6 bg-surface_container_highest rounded-full" />
            <button className="w-8 h-8 bg-surface_container_highest rounded-full" />
          </div>
        </header>

        {/* Market Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <section className="col-span-2 bg-surface_container rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-on_surface_variant text-sm font-medium mb-2">
                TOTAL REALIZED P&L
              </div>
              <div
                className="text-primary_container text-5xl font-bold"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                +$4,500.00
                <span className="text-green-400 text-2xl align-top ml-2">
                  +12.4%
                </span>
              </div>
            </div>
            <div className="flex gap-6 mt-6">
              <div>
                <div className="text-on_surface_variant text-xs">
                  Monthly Gain
                </div>
                <div className="text-white font-semibold">+$842.15</div>
              </div>
              <div>
                <div className="text-on_surface_variant text-xs">
                  Max Drawdown
                </div>
                <div className="text-red-400 font-semibold">-4.2%</div>
              </div>
            </div>
            {/* Chart Placeholder */}
            <div className="mt-6 h-20 w-full bg-surface_container_lowest rounded"></div>
          </section>
          <section className="bg-surface_container rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="text-on_surface_variant text-sm font-medium mb-2">
              EXECUTION WIN RATE
            </div>
            {/* Circular Chart Placeholder */}
            <div className="relative flex items-center justify-center mb-2">
              <svg width="80" height="80">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#222"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#00f296"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="226"
                  strokeDashoffset="72"
                />
              </svg>
              <span
                className="absolute text-2xl font-bold text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                68%
              </span>
            </div>
            <div className="flex gap-4 text-xs text-on_surface_variant">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-primary_container rounded-full inline-block" />{" "}
                Wins
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-surface_container_highest rounded-full inline-block" />{" "}
                Losses
              </span>
            </div>
          </section>
        </div>

        {/* Recent Trade Performance & Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Trade Performance */}
          <section className="col-span-2 bg-surface_container rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white font-semibold text-lg">
                Recent Trade Performance
              </div>
              <Link
                href="#"
                className="text-primary_container text-sm font-medium"
              >
                View All Activity
              </Link>
            </div>
            <div className="divide-y divide-transparent">
              {/* Row 1 */}
              <div className="flex items-center py-3 hover:bg-surface_container_highest rounded transition">
                <div className="w-8 h-8 bg-surface_container_lowest rounded mr-4" />
                <div className="flex-1">
                  <div className="text-white font-medium">
                    BTC/USDT{" "}
                    <span className="text-green-400 text-xs ml-2">LONG</span>
                  </div>
                  <div className="text-on_surface_variant text-xs">
                    Entry $42,340.00 / Exit $43,150.00
                  </div>
                </div>
                <div className="text-green-400 font-semibold mr-6">
                  +$810.00
                </div>
                <div className="text-on_surface_variant text-xs mr-6">
                  2.1% Gain
                </div>
                <span className="bg-surface_container_highest text-blue-300 text-xs px-3 py-1 rounded">
                  CLOSED
                </span>
              </div>
              {/* Row 2 */}
              <div className="flex items-center py-3 hover:bg-surface_container_highest rounded transition">
                <div className="w-8 h-8 bg-surface_container_lowest rounded mr-4" />
                <div className="flex-1">
                  <div className="text-white font-medium">
                    ETH/USDT{" "}
                    <span className="text-red-400 text-xs ml-2">SHORT</span>
                  </div>
                  <div className="text-on_surface_variant text-xs">
                    Entry $2,540.00 / Exit $2,690.00
                  </div>
                </div>
                <div className="text-red-400 font-semibold mr-6">-$215.40</div>
                <div className="text-on_surface_variant text-xs mr-6">
                  1.4% Loss
                </div>
                <span className="bg-surface_container_highest text-blue-300 text-xs px-3 py-1 rounded">
                  CLOSED
                </span>
              </div>
              {/* Row 3 */}
              <div className="flex items-center py-3 hover:bg-surface_container_highest rounded transition">
                <div className="w-8 h-8 bg-surface_container_lowest rounded mr-4" />
                <div className="flex-1">
                  <div className="text-white font-medium">
                    SOL/USDT{" "}
                    <span className="text-green-400 text-xs ml-2">LONG</span>
                  </div>
                  <div className="text-on_surface_variant text-xs">
                    Entry $102.15 / Exit $114.50
                  </div>
                </div>
                <div className="text-green-400 font-semibold mr-6">
                  +$1,235.00
                </div>
                <div className="text-on_surface_variant text-xs mr-6">
                  12.1% Gain
                </div>
                <span className="bg-surface_container_highest text-blue-300 text-xs px-3 py-1 rounded">
                  CLOSED
                </span>
              </div>
            </div>
          </section>
          {/* Side Cards */}
          <div className="flex flex-col gap-6">
            {/* Refine Your Edge */}
            <section className="bg-surface_container rounded-xl p-6 flex flex-col gap-3">
              <div className="text-white font-semibold text-lg">
                Refine Your Edge
              </div>
              <div className="text-on_surface_variant text-sm mb-2">
                Systematic logging is the difference between gambling and
                professional trading.
              </div>
              <button className="w-full py-3 rounded-lg font-semibold text-on_primary_fixed bg-gradient-to-r from-primary_container to-primary_fixed_dim hover:from-primary_fixed_dim hover:to-primary_container transition">
                Journal your next trade
              </button>
            </section>
            {/* Risk Exposure */}
            <section className="bg-surface_container rounded-xl p-6 flex flex-col gap-3">
              <div className="text-on_surface_variant text-xs font-medium">
                RISK EXPOSURE
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm">Active Margin</span>
                <span className="text-white font-semibold">$12,400.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on_surface_variant text-sm">
                  Portfolio Utilization
                </span>
                <span className="text-white font-semibold">24%</span>
              </div>
              <div className="w-full h-2 bg-surface_container_lowest rounded mt-2">
                <div
                  className="h-2 bg-primary_container rounded"
                  style={{ width: "24%" }}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

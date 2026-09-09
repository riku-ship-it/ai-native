import type { Metadata } from "next";
import "./globals.css";

// 注意：這裡刻意不使用 next/font/google（build 環境不一定能連到 Google Fonts），
// 改用系統內建的中文／等寬字型堆疊，globals.css 裡的 --font-noto / --font-geist-mono 已對應設定。

export const metadata: Metadata = {
  title: "AI 原生分身系統 — 多代理人儀表板",
  description: "Riku 的個人 AI 原生分身系統控制台",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-void">{children}</body>
    </html>
  );
}

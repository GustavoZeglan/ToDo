"use client"
import { DashboardProvider } from "@/context/dashboardContext";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Toaster } from "react-hot-toast";
import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/static/favicon.ico.png" sizes="any" />
          </head>
          <StyledComponentsRegistry>
            <body style={{ margin: "0px" }}>
              <NextAuthSessionProvider>
                <DashboardProvider>
                  <Toaster position="bottom-center" />
                  {children}
                </DashboardProvider>
              </NextAuthSessionProvider>
            </body>
          </StyledComponentsRegistry>
        </html>
        )
}
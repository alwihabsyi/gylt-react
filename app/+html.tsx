import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                {/* PWA */}
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <link rel="apple-touch-icon" href="/logo192.png" />

                {/* Service worker registration */}
                <script dangerouslySetInnerHTML={{ __html: sw }} />

                <style dangerouslySetInnerHTML={{
                    __html: `
                input, textarea, select {
                    outline: none !important;
                    -webkit-tap-highlight-color: transparent;
                }
                * {
                    -webkit-tap-highlight-color: transparent;
                }
                ` }}
                />

                <ScrollViewStyleReset />
            </head>
            <body>{children}</body>
        </html>
    );
}

const sw = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
`;
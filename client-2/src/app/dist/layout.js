"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var google_1 = require("next/font/google");
var fontSans = google_1.Inter({
    subsets: ["latin"],
    variable: "--font-sans"
});
var theme_provider_1 = require("@/components/theme-provider");
var utils_1 = require("@/lib/utils");
var mode_toggle_1 = require("@/components/mode-toggle");
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: utils_1.cn("min-h-screen bg-background font-sans antialiased", fontSans.variable) },
            React.createElement("div", { className: "h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center" },
                React.createElement("div", { className: "absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" }),
                React.createElement("div", { className: "absolute top-4 right-4" },
                    React.createElement(mode_toggle_1.ModeToggle, null)),
                React.createElement(theme_provider_1.ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, disableTransitionOnChange: true }, children)))));
}
exports["default"] = RootLayout;

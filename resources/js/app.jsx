import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import ThemeCustomization from "./themes";
import { store, persister } from "./store";
import { ConfigProvider } from "./contexts/ConfigContext";
import Locales from "./Components/Locales";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persister}>
                    <ConfigProvider>
                        <ThemeCustomization>
                            <Locales>
                                {/* <AuthProvider> */}
                                <App {...props} />
                                {/* </AuthProvider> */}
                            </Locales>
                        </ThemeCustomization>
                    </ConfigProvider>
                </PersistGate>
            </ReduxProvider>
        );
    },
    progress: {
        color: "#f27013",
    },
});

import type { ReactNode } from "react";

interface LayoutProps {

    children: ReactNode;

}

export default function Layout({ children }: LayoutProps) {

    return (

        <main
            style={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: "24px"
            }}
        >

            {children}

        </main>

    );

}
interface PageHeaderProps {

    title: string;

    subtitle?: string;

}

import "./PageHeader.css";

function PageHeader({
    title,
    subtitle,
}: PageHeaderProps) {

    return (

        <header
            className="page-header"
        >

            <div
                className="page-header__inner"
            >

                <h1
                    className="page-header__title"
                >
                    {title}
                </h1>

                {subtitle && (

                    <p
                        className="page-header__subtitle"
                    >
                        {subtitle}
                    </p>

                )}

            </div>

        </header>

    );

}

export default PageHeader;
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keyword} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome To ShopMall',
    description: 'We sell the best products at the best prices',
    keywords: 'electronics, buy electronics, cheap electronics',
};


export default Meta

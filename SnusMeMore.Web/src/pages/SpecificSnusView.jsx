import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../assets/CSS/productpage.css";
import ProductView from "../components/ProductComponent.jsx";
import TopRatedSnus from "../components/TopRatedSnus.jsx";

const ProductPage = () => {

    return(
        <div>
            <ProductView />
            <TopRatedSnus />
        </div>
    )
};

export default ProductPage;

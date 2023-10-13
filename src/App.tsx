import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import products from "./products";
import suppliers from "./suppliers";
import stocks from "./stocks";
import purchases from "./purchases";


export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="purchases" {...purchases}></Resource>
    <Resource name="stocks" {...stocks} ></Resource>
    <Resource name="products" {...products}></Resource>
    <Resource name="suppliers" {...suppliers}></Resource>

    {/* <Resource name="suppliers" list={ListGuesser} /> */}
  </Admin>
);

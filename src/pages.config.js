import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "PrivacyPolicy": PrivacyPolicy,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};

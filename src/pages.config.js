import Home from './pages/Home';
import Solutions from './pages/Solutions';
import StairLift from './pages/StairLift';
import WheelchairRamps from './pages/WheelchairRamps';
import BathroomSafety from './pages/BathroomSafety';
import Homelifts from './pages/Homelifts';
import AboutUs from './pages/AboutUs';
import Ramps from './pages/Ramps';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AssessmentDesignServices from './pages/AssessmentDesignServices';
import SafeShowers from './pages/SafeShowers';
import FinancingOptions from './pages/FinancingOptions';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Solutions": Solutions,
    "StairLift": StairLift,
    "WheelchairRamps": WheelchairRamps,
    "BathroomSafety": BathroomSafety,
    "Homelifts": Homelifts,
    "AboutUs": AboutUs,
    "Ramps": Ramps,
    "PrivacyPolicy": PrivacyPolicy,
    "AssessmentDesignServices": AssessmentDesignServices,
    "SafeShowers": SafeShowers,
    "FinancingOptions": FinancingOptions,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
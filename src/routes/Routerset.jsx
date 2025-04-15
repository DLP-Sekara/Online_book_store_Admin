import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Routerset = () => {
  //const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* -----------------------------basic routes----------------------------- */}
      {/* <Route path="onboarding/*" element={<OnBoardingProcess />}>
        <Route path="" element={<SignInView />} />
        <Route path="sign-in" element={<SignInView />} />
        <Route path="sign-up" element={<SignUpView />} />
      </Route> */}

      {/* -----------------------------private & public routes----------------------------- */}
      {/* {true ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="view-book/:id" element={<BookView />} />
          <Route path="help" element={<HelpCenter />} />
          <Route
            path="checkout-book/:id"
            element={<PrivateRoute element={<BookCheckout />} />}
          />
        </Route>
      ) : (
        <Route path="*" element={<SignInView />} />
      )} */}
    </Routes>
  );
};

export default Routerset;

// const PublicRoutes = ({ element, allow }) => {
//   const { block, user } = useContext(AuthContext);

//   if (block) {
//     if (allow) {
//       if (user?.role === 3) {
//         return element;
//       } else {
//         // return <Navigate to="/unauthorized-error" replace />;
//         return element;
//       }
//     } else {
//       return <Navigate to="/subscription-expired" replace />;
//     }
//   } else {
//     return element;
//   }
// };

// const PrivateRoute = ({ element }) => {
//   const { isAuthChack, setIsAuthChack } = useContext(AuthContext);

//   if (!isAuthChack) {
//     return element;
//   } else {
//     return <Navigate to="/onboarding/sign-up" replace />;
//   }
// };

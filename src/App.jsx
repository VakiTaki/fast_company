import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar/navBar";
import UserEditPage from "./components/page/userEditPage";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <AuthProvider>
            <div className="container">
                <header>
                    <NavBar />
                </header>
                <main>
                    <ProfessionProvider>
                        <QualityProvider>
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route path="/logout" component={LogOut} />
                                <Route path="/login/:type?" component={Login} />
                                <UserProvider>
                                    <ProtectedRoute
                                        path="/users/:id/edit"
                                        component={UserEditPage}
                                    />
                                    <ProtectedRoute
                                        exact
                                        path="/users/:id?"
                                        component={Users}
                                    />
                                </UserProvider>
                                <Redirect to="/" />
                            </Switch>
                        </QualityProvider>
                    </ProfessionProvider>
                </main>
                <ToastContainer />
            </div>
        </AuthProvider>
    );
}

export default App;

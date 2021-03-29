import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const MenuBar = () => {
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState(path);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_ERROR" });
    history.push("/");
    setUser(null);
    setActiveItem(path);
  };

  const menu = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.data.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menu;
};

export default MenuBar;

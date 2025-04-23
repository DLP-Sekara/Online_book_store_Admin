import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MainLogo from "../../assets/images/svg/MainLayout/MainLogo";
import {
  ConfigProvider,
  Input,
  Popover,
  Segmented,
  Tooltip,
  Typography,
} from "antd";
import HomeIcon from "../../assets/images/svg/MainLayout/HomeIcon";
import HomeAndNotificationContext from "../../context/HomeAndNotificationContext";
import DashboardDropdownIcon from "../../assets/images/svg/MainLayout/DashboardDropdownIcon";
import CartIcon from "../../assets/images/svg/MainLayout/CartIcon";
import HelpIconNew from "../../assets/images/svg/MainLayout/HelpIconNew";
import UserColorProfile from "../../components/ColorProfile/UserColorProfile";
import { AuthContext } from "../../context/AuthContext";
import SideDrawer from "../../components/side_drawers/SideDrawer";
// import CartBody from "../../components/CartBody/CartBody";
import { NotificationContext } from "../../context/NotificationContext";
import SignInServices from "../../services/SignInServices";
const { Text } = Typography;
const DashboardLayout = () => {
  const {
    isHome,
    selectedIcon,
    setSelectedIcon,
    openCartDrawer,
    setOpenCartDrawer,
  } = useContext(HomeAndNotificationContext);
  const { block, user, setToken } = useContext(AuthContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [logoutState, setLogoutState] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("Orders");

  const navigateTo = useNavigate();
  const { logOutAdmin } = SignInServices();

  //segments options
  const segmentOptions = [
    {
      label: (
        <Text
          className={`text-secondaryTwo flex w-32 items-center justify-center p-1 font-semibold sm:w-40`}
        >
          Orders
        </Text>
      ),
      value: "Orders",
    },
    {
      label: (
        <Text
          className={`text-secondaryTwo flex w-32 items-center justify-center p-1 font-semibold sm:w-40`}
        >
          Customers
        </Text>
      ),
      value: "Customers",
    },
    {
      label: (
        <Text
          className={`text-secondaryTwo flex w-32 items-center justify-center p-1 font-semibold sm:w-40`}
        >
          Books
        </Text>
      ),
      value: "Books",
    },
  ];
  useEffect(() => {
    if (selectedSegment === "Orders") {
      navigateTo("orders");
    } else if (selectedSegment === "Customers") {
      navigateTo("customers");
    } else if (selectedSegment === "Books") {
      navigateTo("books");
    }
  }, [selectedSegment]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    switch (selectedIcon) {
      case "home":
        navigateTo("/");
        break;
      case "all-books":
        navigateTo("all-books");
        break;
      case "help":
        navigateTo("help");
        break;
      default:
        break;
    }
  }, [selectedIcon]);

  // useEffect(() => {
  //   setOpenCartDrawer(true);
  // }, [openCartDrawerGlobal]);

  const handleSearch = (value) => {
    console.log(value);
    //  if (value) {
    //    setSearchValue(value);
    //    handlePopoverVisibleChange("searchBar", true);
    //  } else {
    //    setSearchValue(""); // Clear the search value
    //    handlePopoverVisibleChange("searchBar", false); // Close the popover
    //  }
  };
  const signOutAction = async () => {
    setLogoutState(true);
    const response = await logOutAdmin();
    if (response) {
      if (response.responseType === "success") {
        openNotification("success", response?.output?.message);

        // Define keys you want to keep (e.g., credentials for "Remember Me")
        const keysToKeep = [
          "rememberedEmail",
          "rememberedPassword",
          "rememberMe",
        ];
        // Temporarily store the values for the keys to keep
        const valuesToKeep = keysToKeep.reduce((acc, key) => {
          acc[key] = localStorage.getItem(key);
          return acc;
        }, {});
        // Clear all items in localStorage
        localStorage.clear();
        // Restore the "Remember Me" values back to localStorage
        keysToKeep.forEach((key) => {
          if (valuesToKeep[key] !== null) {
            localStorage.setItem(key, valuesToKeep[key]);
          }
        });
        setToken(false);
        window.location.replace("/onboarding/sign-in");
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response?.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
  };

  const handleClearSearch = () => {
    // setSearchValue(""); // Clear the search field value
    // setPopoverVisible(false); // Optionally close the popover after clearing
  };

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col">
      {/* dashboard header */}
      <div className="border-secondarySix fixed z-50 flex h-[60px] w-full flex-row items-center justify-between border-b-[0.2px] bg-white px-2 sm:px-4">
        {/* logo */}
        <div
          className="hidden h-10 w-fit items-center justify-start lg:flex"
          onClick={() => {}}
        >
          <Link to="/">
            {/* <MainLogo className="h-[25px] w-[100px] md:h-[30px] md:w-[120px] lg:h-[40px] lg:w-[140px]" /> */}
            <Text className="text-Blue-500 text-2xl font-bold">BOOK STORE</Text>
          </Link>
        </div>

        {/* search books */}
        <div className="">
          <Popover
            open={popoverVisible}
            content={
              <div className="h-auto w-[200px] md:h-[440px] md:w-[360px]">
                {/* <SearchPopoverContent
                  setIsClosePopover={() => setPopoverVisible(false)}
                  handlePopoverVisibleChange={handlePopoverVisibleChange}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onClose={handleClearSearch} // Clear search field and close popover
                /> */}
              </div>
            }
            trigger="click"
            arrow={false}
            //onOpenChange={handlePopoverVisibleChange}
          >
            <div
              className=""
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "inherit")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "inherit")
              }
              onClick={() => {
                if (block) {
                  navigate("/subscription-expired"); // Redirect to subscription page if user is blocked
                }
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: "#FFFFFF",
                    borderRadius: "9999px",
                    itemColor: "#FFFFFF",
                  },
                  components: {
                    Input: {
                      activeBorderColor: "primary",
                    },
                  },
                }}
              >
                <div className="flex flex-row rounded-full border-2 border-primary">
                  <Input.Search
                    allowClear
                    size="normal"
                    className="custom-search w-36 items-center text-2xl placeholder:text-3xl placeholder:font-semibold md:w-60 xl:w-96"
                    variant="borderless"
                    placeholder="Search Books by book's name"
                    maxLength={60}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    enterButton
                  />
                </div>
              </ConfigProvider>
            </div>
          </Popover>
        </div>

        {/* support icons */}
        <div className="flex flex-row items-center gap-8">
          <Tooltip title="Home">
            <Link
              className="cursor-pointer"
              to="/"
              onClick={() => handleIconClick("home")}
            >
              <HomeIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "home" ? "#0d7cff" : "#939292"}
              />
            </Link>
          </Tooltip>

          <Tooltip title="All Books">
            <div
              className="cursor-pointer"
              onClick={async () => {
                //await navigateToDashboard();
                handleIconClick("all-books");
              }}
            >
              <DashboardDropdownIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "all-books" ? "#0d7cff" : "#939292"}
              />
            </div>
          </Tooltip>

          <Tooltip title="Cart">
            <div
              className="cursor-pointer"
              onClick={async () => {
                //await navigateToDashboard();
                //handleIconClick("Cart");
                setOpenCartDrawer(true);
              }}
            >
              <CartIcon className="h-6 w-6 sm:h-8 sm:w-8" color={"#939292"} />
            </div>
          </Tooltip>

          <Tooltip title="Help">
            <Link
              className="cursor-pointer"
              to="/support"
              onClick={() => handleIconClick("help")}
            >
              <HelpIconNew
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "help" ? "#0d7cff" : "#FFA234"}
              />
            </Link>
          </Tooltip>

          <UserColorProfile
            name={user?.username || "N Z"}
            color={user?.profileColor}
            size="32px"
            textSize="14px"
            onClick={() => handleIconClick("profile")}
          />
          {user !== null ? (
            <Text
              onClick={() => signOutAction()}
              className="cursor-pointer text-xs text-blue-500 hover:underline"
            >
              Sign Out
            </Text>
          ) : (
            <Text
              onClick={() => {
                window.location.replace("/onboarding/sign-up");
              }}
              className="cursor-pointer text-xs text-blue-500 hover:underline"
            >
              Register
            </Text>
          )}
        </div>
      </div>

      {/* outlet */}
      <div
        className="mt-[60px] w-full flex-1"
        style={{ backgroundColor: "themeColor" }}
      >
        {/* segmented area */}
        <div className="flex h-fit w-full items-center justify-start pl-2 pt-3">
          <Segmented
            size="medium"
            options={segmentOptions}
            value={selectedSegment}
            className="bg-secondarySix flex p-1"
            onChange={(e) => {
              console.log(e);
              setSelectedSegment(e);
            }}
          />
        </div>
        <Outlet />
      </div>

      {openCartDrawer && (
        <SideDrawer
          open={openCartDrawer}
          handleClose={() => setOpenCartDrawer(false)}
          icon={<CartIcon color={"black"} />}
          title={"Cart"}
        >
          {/* <CartBody /> */}
        </SideDrawer>
      )}
    </div>
  );
};

export default DashboardLayout;

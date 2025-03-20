import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import { getMovieById } from "../../services/apis/mediaService/movieService";
import { fetchSeriesByID } from "../../services/apis/mediaService/seriesService";
import { genreMap } from "../../utils/MediaConstants";
const pathLabels: Record<string, string> = {
  "home": "Home",
  "search":"Search",
  "movies":"Movies",
  "series":"Series",
  "genres":"Genres",
  "contact-us":"Contact",
  "profile-page":"Profile",
  "payment-success":"Payment-Success",
  "payment-cancel":"Payment-Cancel",
  "watch":"Watch",
  "admin-dashboard-movies": "Movie Dashboard",
  "admin-dashboard-series": "Series Dashboard",
  "user-dashboard":"User Dashboard",
  "add-movies": "Add Movie",
  "add-series": "Add Series",
  "add-episode": "Add Episode",
  "details": "Details",
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);
  const [title, setTitle] = useState<string | null>(null);
  let extraBreadcrumb = null;
  if (pathnames.includes("add-movies")) {
    extraBreadcrumb = { path: "/admin-dashboard-movies", label: "Movie Dashboard" };
  } else if (pathnames.includes("add-series") || pathnames.includes("add-episode")) {
    extraBreadcrumb = { path: "/admin-dashboard-series", label: "Series Dashboard" };
  }
  useEffect(() => {
    if (!pathnames.includes("details") && !(pathnames.length===2 && pathnames[0]==="genres")) {
      setTitle(null);
      return;
    }
    const queryParams = new URLSearchParams(location.search);
    const contentType = queryParams.get("contentType") as "Movie" | "Series" | null;

    const lastSegment = pathnames[pathnames.length - 1];

    if (pathnames.includes("details") && lastSegment && contentType) {
      const fetchData = async () => {
        try {
          let response;
          if (contentType === "Movie") {
            response = await getMovieById(lastSegment);
            setTitle(response?.movie?.title || null);
          } 
          else if(contentType==="Series") {
            response = await fetchSeriesByID(lastSegment);
            setTitle(response?.seriesInfo?.title || null);
          }
        } catch (error) {
          console.error("Error fetching content name:", error);
          setTitle(null);
        }
      };

      fetchData();
    }
    else if(pathnames.includes("watch") && lastSegment){
      const fetchData=async()=>{
        try {
          const response=await getMovieById(lastSegment);
          setTitle(response?.movie?.title || null);
        } catch (error) {
          console.error("Error fetching movie title",error)
          setTitle(null);
        }
      }
      fetchData();
    }
    else if(pathnames.length===2 && pathnames[0]==="genres"){
      const genreId=parseInt(lastSegment,10);
      if (!isNaN(genreId) && genreMap[genreId]) {
        setTitle(genreMap[genreId]);
      }
    }
  }, [location.pathname, location.search]);

  return (
    <nav className="breadcrumb">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {extraBreadcrumb && (
          <li>
            <Link to={extraBreadcrumb.path}>{extraBreadcrumb.label}</Link>
          </li>
        )}
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          let displayText = pathLabels[path] || decodeURIComponent(path);

          if (isLast && (pathnames.includes("details") || pathnames.includes("watch") ) && title) {
            displayText = title;
          }
          if(isLast && pathnames.length===2 && pathnames[0]==="genres" && title){
            displayText=title;
          }

          return (
            <li key={routeTo} className={isLast ? "active" : ""}>
              {isLast ? <span>{displayText}</span> : <Link to={routeTo}>{displayText}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;

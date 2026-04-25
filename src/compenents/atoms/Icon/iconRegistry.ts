import { 
  MdCalendarMonth, 
  MdEvent, 
  MdArrowForward, 
  MdKeyboardArrowDown,
  MdKeyboardArrowRight, 
  MdKeyboardArrowLeft,
  MdOutlineDashboard,
  MdOutlineManageAccounts,
  MdOutlineSettings   } from "react-icons/md";

import { 
  FaUser, 
  FaLocationDot,
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareFacebook,
  FaLinkedin,
  FaSquareWhatsapp,
  FaSquareYoutube } from "react-icons/fa6";

export const ICON_REGISTRY = {
  dashboard: MdOutlineDashboard,
  management: MdOutlineManageAccounts,
  settings: MdOutlineSettings,
  calendar: MdCalendarMonth,
  event: MdEvent,
  arrow: MdArrowForward,
  location: FaLocationDot,
  dropdown: MdKeyboardArrowDown,
  arrowRight: MdKeyboardArrowRight,
  arrowLeft: MdKeyboardArrowLeft,

  // Fontawesome Icons
  user: FaUser,
  twitter:FaSquareXTwitter,
  instagram:FaSquareInstagram,
  facebook:FaSquareFacebook,
  linkedin:FaLinkedin,
  whatsapp:FaSquareWhatsapp,
  youtube:FaSquareYoutube,
};
import { Link } from "react-router-dom";
import { CONFIG } from "@utils/config";
import "@styles/button.css";

interface RecruitButtonProps {
  onClick?: () => void;
}

export function RecruitButton({ onClick }: RecruitButtonProps) {

  if (!CONFIG.RECRUIT) return null;

  return (
    <Link to="/recruit" className="btn-primary" onClick={onClick}>
      {CONFIG.RECRUIT_YEAR} 지원하기
    </Link>
  );
}
import { Link } from "react-router-dom";
interface ElementProp {
  to: string;
  children: React.ReactNode;
}
const LinkElement = ({ to = "/", children }: ElementProp) => {
  return (
    <>
      <Link to={to}>{children}</Link>
    </>
  );
};

export default LinkElement;

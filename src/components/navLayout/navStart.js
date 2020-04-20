import { useRouter } from "next/router";
import Button from "../ui/button";

const navStart = ({ linkItems, moreItems = null }) => {
  const router = useRouter();

  const displayMoreItems = () => {
    if (!moreItems) {
      return;
    }

    return moreItems.map((item, i) => {
      const isActive = router.pathname === item.href ? "is-active" : "";

      return (
        <Button
          text={item.name}
          classNames={`is-text is-fullwidth ${isActive}`}
          key={i}
        />
      );
    });
  };

  return (
    <div className="navbar-start" style={{ alignItems: "center" }}>
      {linkItems.map((item, i) => {
        const isActive = router.pathname === item.href ? "is-active" : "";
        return (
          <Button
            key={i}
            handleClick={() => router.push(item.href)}
            text={item.name}
            classNames={`is-text ${isActive}`}
          />
        );
      })}

      <div
        className={
          moreItems ? "navbar-item has-dropdown is-hoverable" : "is-hidden"
        }
      >
        <a className="button is-text navbar-link">More</a>

        <div className="navbar-dropdown">{moreItems && displayMoreItems()}</div>
      </div>
    </div>
  );
};

export default navStart;

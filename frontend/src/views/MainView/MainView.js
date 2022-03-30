import React from "react";
import TopInfoPanel from "../../components/TopInfoPanel/TopInfoPanel";

const MainView = ({ defaultStation }) => {
  return (
    <div>
      <section>
        <TopInfoPanel defaultStation={defaultStation} />
      </section>
    </div>
  );
};

export default MainView;

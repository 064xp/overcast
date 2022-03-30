import React from "react";
import TopInfoPanel from "../../components/TopInfoPanel/TopInfoPanel";

const MainView = ({ defaultStation, setDefaultStation }) => {
  return (
    <div>
      <section>
        <TopInfoPanel
          defaultStation={defaultStation}
          setDefaultStation={setDefaultStation}
        />
      </section>
    </div>
  );
};

export default MainView;

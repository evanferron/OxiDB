import React, { useMemo, useState } from "react";
import { AppContext } from "../services/context.service";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [dataSourceId, setDataSourceId] = useState<string | undefined>();

  const contextValue = useMemo(
    () => ({
      dataSourceId,
      setDataSourceId,
    }),
    [dataSourceId],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;

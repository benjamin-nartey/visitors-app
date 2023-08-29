import { createContext, useContext, useState } from 'react';

export const ReportContext = createContext({
  showReportModal: false,
});

export const useReportContext = () => {
  return useContext(ReportContext);
};
export const ReportContextProvider = ({ children }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ReportContext.Provider
      value={{ showReportModal, setShowReportModal, isLoading, setIsLoading }}
    >
      {children}
    </ReportContext.Provider>
  );
};

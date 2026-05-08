import type { FC, SetStateAction, Dispatch } from "react";

interface SqliteSectionProps {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
}

const SqliteSection: FC<SqliteSectionProps> = ({ path, setPath }) => {
  return (
    <div>
      <input
        type="text"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
    </div>
  );
};

export default SqliteSection;

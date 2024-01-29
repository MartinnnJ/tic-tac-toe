import { Log } from "../helpers/types";
import { Logger, LoggerMessage } from "./GameLogger.styled";
import { AnimatePresence, motion } from "framer-motion";

interface GameLoggerProps {
  data: Log[];
}

const GameLogger: React.FC<GameLoggerProps> = ({ data }) => {
  console.log(data);

  return (
    <Logger>
      <AnimatePresence>
          {data.map((logObj, index) => {
            const lastLog = index === 0 ? true : false;
            return (
              <motion.div
                key={logObj.id}
                layout
                initial={{ opacity: 0, scale: .5, y: -10 }}
                animate={{ opacity: 1, scale: 1.0, y: 0 }}
                exit={{ opacity: 0, scale: .5, y: 10 }}
                transition={{ duration: 0.35 }}
              >
                <LoggerMessage
                  key={index}
                  $new={lastLog}
                >
                  {logObj.text}
                </LoggerMessage>
              </motion.div>
            );
          })}
        </AnimatePresence>
    </Logger>
  );
}

export default GameLogger;
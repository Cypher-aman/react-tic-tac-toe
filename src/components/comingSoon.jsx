import "./comingSoon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const ComingSoon = function ({ children, showModal, setShowModal, classN }) {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 80, delay: 1 }}
      className={`noticeBox ${showModal ? "" : "hidden"} ${classN}`}
    >
      <FontAwesomeIcon
        onClick={() => setShowModal(false)}
        icon={faX}
        className="close"
      />
      <p>{children}</p>
    </motion.div>
  );
};

export default ComingSoon;

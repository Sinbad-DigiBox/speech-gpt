import { motion } from "framer-motion";

const Header = () => {
    return (
        <nav>
            <ul className="flex justify-center gap-x-4 items-center">
                <motion.li
                    transition={{ delay: 0.1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-12 h-12 rounded-full" />
                <motion.li
                    transition={{ delay: 0.15 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-14 h-14 rounded-full" />
                <motion.li
                    transition={{ delay: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-16 h-16 rounded-full" />
                <motion.li
                    transition={{ delay: 0.25 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-14 h-14 rounded-full" />
                <motion.li
                    transition={{ delay: 0.3 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-12 h-12 rounded-full" />
            </ul>
        </nav>
    );
}

export default Header;
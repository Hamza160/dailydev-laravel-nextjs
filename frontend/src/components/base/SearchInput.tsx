import {SearchIcon} from "lucide-react";

const SearchInput = () => {
    return (
        <div className="relative hidden lg:block">
            <input
                type="text"
                className="w-full lg:w-[500px] h-12 p-y outline-none bg-muted rounded-2xl pl-10"
                placeholder="Search here..."
            />
            <SearchIcon className="absolute top-3 left-2 w-5 h-5" />
        </div>
    )
}

export default SearchInput;
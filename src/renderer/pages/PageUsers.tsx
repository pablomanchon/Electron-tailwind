import UsersPanel from "../components/user/UsersPanel";
import Main from "../layout/Main";
import { SearchProvider } from "../providers/SearchProvider";

export default function PageUsers() {
  return (
    <SearchProvider>
      <Main>
        <UsersPanel />
      </Main>
    </SearchProvider>
  )
}

import PanelCtasCtes from '../components/ctas-ctes/PanelCtasCtes'
import Main from '../layout/Main'
import { SearchProvider } from '../providers/SearchProvider'

export default function PageCtasCtes() {
  return (
    <SearchProvider>
      <Main>
        <PanelCtasCtes />
      </Main>
    </SearchProvider>
  )
}

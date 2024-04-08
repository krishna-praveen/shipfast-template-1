import { ActionRoot } from './ActionRoot';
import { GroupTopBar } from './GroupTopBar'
import { NavigationHandlerTopBar } from './NavigationHandlerTopBar'
import { RootTopBar } from './RootTopBar';
import { SubTitleTopBar } from './SubTitleTopBar';
import { TitleTopBar } from './TitleTopBar';

export const TopBar = {
  Navigation: NavigationHandlerTopBar,
  Action: ActionRoot,
  Root: RootTopBar,
  Title: TitleTopBar,
  Group: GroupTopBar,
  SubTitle: SubTitleTopBar,
}

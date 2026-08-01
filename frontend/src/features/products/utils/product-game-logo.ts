const gameLogoPaths: Record<string, string> = {
  DOFUS: '/media/brand/nav-logos/nav_item_dofus.svg',
  DOFUS_RETRO: '/media/brand/nav-logos/nav_item_dofus_retro.svg',
  WAKFU: '/media/brand/nav-logos/nav_item_wakfu.svg',
  WAVEN: '/media/brand/nav-logos/nav_item_waven.svg',
  KROSMAGA: '/media/brand/nav-logos/nav_item_krosmaga.svg',
  PREMIUM_GAMES: '/media/brand/nav-logos/nav_item_premium_games.svg',
  WEBTOONS: '/media/brand/nav-logos/nav_item_webtoons.png',
}

/** Returns the official game mark used by product cards. */
export function getProductGameLogo(game: string): string | undefined {
  return gameLogoPaths[game]
}

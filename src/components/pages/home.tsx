import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='text-white font-mono'>
      <div>This is a home</div>
      <Link to="/search">SEARCH</Link>
    </div>
  )
}

export default Home

// Xボタン押してテキストボックスへフォーカス
// 単語を押すと、上にスクロール
// ページの下にバツボタン配置して、テキストボックス削除＋上にスクロール
// AI on/off & AI 残りカウント
// 単語の横にコピーアイコン表示Click to Copy
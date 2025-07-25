'use client'

export default function ImprovedIndexSection() {
  return (
    <div className="_2a56b767 _47e76c6c" style={{ left: '0px' }}>
      {/* Background decorations */}
      <div className="_165feda9"></div>

      {/* Background video */}
      <video
        className="_daa0ae89"
        playsInline
        crossOrigin="anonymous"
        muted
        loop
        preload="metadata"
        data-autoplay="1"
        autoPlay
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Canvas overlay */}
      <canvas className="_02a74b8e" width="960" height="540"></canvas>

      {/* Additional background elements */}
      <div className="_96034668"></div>
      <div className="_120363a9"></div>
      <div className="_311266e9"></div>

      {/* Main content - Logo and title */}
      <div className="_db42efb9">
        <div className="_f030b7bc">
          <div className="_eb6721a0">ARKNIGHTS</div>
          <div className="_a8defe45">
            <div className="_a4cb003f">RHODES ISLAND</div>
            <div className="_d0bb52f6">HTTPS://AK.HYPERGRYPH.COM/</div>
          </div>
        </div>
        <div className="_bb7846aa">
          <svg viewBox="0 0 166 18">
            <use xlinkHref="#svg_def-copyright_mini"></use>
          </svg>
        </div>
      </div>

      {/* Download links */}
      <div className="_e32dd037">
        <a className="_46f42502 _f2a0009b" target="_blank" href="https://itunes.apple.com/cn/app/id1454663939?mt=8">
          <div className="_86418c91">
            <svg viewBox="0 0 245.2 286.3">
              <use xlinkHref="#svg_def-icon_iOS"></use>
            </svg>
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">App Store</div>
            <div className="_c6a344ce">下载</div>
          </div>
        </a>

        <a className="_46f42502 _79edd75a" target="_blank" href="https://ak.hypergryph.com/downloads/android_lastest">
          <div className="_86418c91">
            <svg viewBox="0 0 242.9 306.7">
              <use xlinkHref="#svg_def-icon_Android"></use>
            </svg>
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">Android</div>
            <div className="_c6a344ce">下载</div>
          </div>
        </a>

        <a className="_46f42502 _c9c4dad8" target="_blank" href="https://l.taptap.cn/H8VVNhvq?channel=rep-rep_typxbuxvnpi">
          <div className="_86418c91">
            <svg viewBox="0 0 50 50">
              <use xlinkHref="#svg_def-icon_TapTap"></use>
            </svg>
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">通过TapTap下载</div>
            <div className="_c6a344ce"></div>
          </div>
        </a>

        <a className="_46f42502 _1287fb1f">
          <div className="_86418c91">
            <img src="/images/icons/emulator.svg" alt="" />
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">模拟器下载</div>
          </div>
        </a>

        <a className="_46f42502 _fa2889b4" target="_blank" href="https://www.skland.com/game/arknights">
          <div className="_86418c91">
            <img src="/images/icons/skland_fullcolor.png" alt="" />
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">官方社区</div>
          </div>
        </a>

        <a className="_46f42502 _969794e2" target="_blank" href="https://user.hypergryph.com/payment/arknights?source_from=ak_official">
          <div className="_86418c91">
            <img src="/images/icons/recharge_center.png" alt="" />
          </div>
          <div className="_523e0079">
            <div className="_2b80a3ba">官方充值中心</div>
          </div>
        </a>
      </div>

      {/* QR Code and age rating */}
      <div className="_d16ac76f">
        <div className="_fbc56429">
          <div className="_a77441b7">
            <span>扫</span><span>码</span><span>下</span><span>载</span>
          </div>
          <img className="_3d5286a4" src="/images/qrcode_download.png" alt="" />
        </div>
        <a href="https://ak.hypergryph.com/news/2021059770.html" target="_blank">
          <img className="_1661c959" src="/images/age_rating.png" alt="" />
        </a>
      </div>
    </div>
  )
}

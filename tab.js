

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER_STORAGE'

const player = $('.player')
const heading =$('header h2')
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-playing');
const progress = $('#progress');
const progressBar = $('.progress-bar');

const nextBtn = $('.btn-forward');
const preBtn = $('.btn-backward');
const randomBtn = $('.btn-randomplay');
const rePlayBtn = $('.btn-replay');
const fixedBtn = $('.btn-fixed-height');
const playlist = $('.playlist')
const dashboard = $('.dashboard');
const defaultCdWidth = cd.style.width;
const defaultDashboardCd = dashboard.style.height;




const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRePlay: false,
    isfixedCD: false,
    // setting: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "./asset/music/1.mp3",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./asset/music/2.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Carlord Terot",
          path:
            "./asset/music/3.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "./asset/music/4.mp3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "./asset/music/5.mp3",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Damn",
          singer: "Raftaar x kr$na",
          path:
            "./asset/music/6.mp3",
          image:
            "https://i.ytimg.com/vi/yBRKqRc-vyQ/maxresdefault.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "./asset/music/7.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ],
    // setConfig: function(key, value) {
    //   this.config[key] = value;
    //   localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    // },
    render: function() {
      const htmls = this.songs.map((song, index) => {
          return `<div class="song ${ index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                      <div class="thumb"
                      style="background-image: url(${song.image})">
                      </div>
                      <div class="body">
                          <h3 class="title">${song.name}</h3>
                          <p class="author">${song.singer}</p>
                      </div>
                      <div class="option">
                          <i class="fa-solid fa-ellipsis"></i>
                      </div>
                  </div>`
      })
      
      playlist.innerHTML = htmls.join('\n')
    },


    // Định nghĩa curentSong:
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    
    handleEvents: function() {
      const _this = this;
        const cdWidth = cd.offsetWidth; // 200px

        // Xử lý CD rotate and stop
        const animateCircle = cdThumb.animate([
          {transform: 'rotate(360deg)'}
        ],{
          duration: 10000,
          iterations: Infinity,
        },
        )
        animateCircle.pause()

        // Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {                
                audio.play()                
            }
        }
        

        // Khi Song play thì lắng nghe Event
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            animateCircle.play()
        }

        // Khi Song Pause thì lắng nghe Event
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            animateCircle.pause()
        }

        //  Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
          const progressPercent = Math.floor(audio.currentTime/audio.duration * 100);
          progress.value = progressPercent > 0 ? progressPercent : 0;
          progressBar.style.width = progress.value + '%';
        }

        // Khi tua bài hát
        progressBar.onchange = function(e) {
          console.log(e)
          // const seekTime = audio.duration * e.target.value / 100;         
        }

        progress.onchange = function(e) {
          const seekTime = audio.duration * e.target.value / 100;
          audio.currentTime = seekTime;
        }        

        // Xử lý phong to thu nhỏ CD
        // document.onscroll = function() {
        //     const scrollTop = document.scrollY || document.documentElement.scrollTop;
        //     const newCdWidth = cdWidth - scrollTop;

        //     cd.style.width = newCdWidth >= 0 ? newCdWidth +'px': 0;
        //     cd.style.opacity = (newCdWidth)/cdWidth;
        // }

        // Xử lý khi bấm nút cuộn CD
        fixedBtn.onclick = function() {        
          _this.isfixedCD = !_this.isfixedCD;
          this.classList.toggle('active', _this.isfixedCD)
          console.log(_this.isfixedCD)
          if (_this.isfixedCD) {
            cd.style.width = 0;
            playlist.style.marginTop = `172px`;
          } else {           
            cd.style.width = defaultCdWidth;
            playlist.style.marginTop = defaultDashboardCd;
          }
        }

        // Khi switchSong
        nextBtn.onclick = function() {
          if (_this.isRandom) {
            _this.playRandomSong()
          } else {
            _this.nextSong()
          }
          _this.render()
          audio.play()
          _this.scrollToActiveSong()
        }

        preBtn.onclick = function() {
          if (_this.isRandom) {
            _this.playRandomSong()
          } else {
            _this.preSong()
          }
          _this.render()
          audio.play()
          _this.scrollToActiveSong()

        }

        // Khi clicks random button
        randomBtn.onclick = function() {         
          _this.isRandom = !_this.isRandom
          // _this.setConfig('isRandom', _this.isRandom)
          this.classList.toggle('active', _this.isRandom)
        }

        
        // Khi click rePlay button
        rePlayBtn.onclick = function() {
          _this.isRePlay = !_this.isRePlay;
          // _this.setConfig('isReplay', _this.isRePlay)
          this.classList.toggle('active', _this.isRePlay) 
        }
        
        // Khi song endup
        audio.onended = function() {
          // if (_this.isRandom) {
          //   _this.playRandomSong()
          //   audio.play()
          // } else {
          //   _this.nextSong()
          //   audio.play()
          // }          
        
          // Hoặc cso thể dùng
          if (_this.isRePlay) {
            // _this.loadCurrentSong() // load current song (chạy bài hát hiện tại)
            audio.play()
          } else (
            nextBtn.click()
          )
        }

        //Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
          const songNode = e.target.closest('.song:not(.active)')
          if (songNode || e.target.closest('.option')) {
            // Xử lý click vào song
            if(songNode) {       
              // getAttribute('data-index') === dataset.index
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              _this.render()
              audio.play()
            }

          }
        }
        
    },

    // currentSong: function() {
    //   return this.songs[this.currentIndex];
    // },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    nextSong: function() {
      this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
          this.currentIndex = 0;
        }
      this.loadCurrentSong();
    },

    preSong: function() {
      this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.songs.length - 1;
        }
      this.loadCurrentSong();
    },

    playRandomSong: function() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length)
      } while (newIndex === this.currentIndex)
      
      this.currentIndex = newIndex
      this.loadCurrentSong();
    }, 

    scrollToActiveSong: function() {
      setTimeout(function() {
        $('.song.active').scrollIntoView({
          behavior: "smooth", 
          block: "end", 
          inline: "end"
        })
      })
    },    

    start: function() {
        // Định nghĩa thuộc tính Object
        this.defineProperties();
        
        // Lắng nghe, xử lý sự kiện
        this.handleEvents();

        // Tair thong tin bai hat dau tien
        this.loadCurrentSong()

        // AutoPlay Song List
        // this.autoPlay()
        
        this.render();

    }
}

app.start()
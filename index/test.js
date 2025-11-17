window.addEventListener('DOMContentLoaded', () => {
    // 安全地预加载音频文件，简化错误处理
    try {
        preloadAudio();
        
        // 尝试在页面加载后自动播放背景音乐
        setTimeout(() => {
            try {
                playMusic('bayinhe');
            } catch (playError) {
                console.warn('自动播放失败，可能需要用户交互:', playError);
                // 不显示错误信息，保持界面整洁
            }
        }, 1000);
    } catch (error) {
        // 静默处理错误，确保游戏能继续运行
        console.warn('音频预加载出现错误，但不影响游戏正常运行:', error);
    }
    
    // 1. 初始元素获取与基础配置
    const blackMask = document.querySelector('.black-mask');
    const startText = document.querySelector('.start-text');
    const startgame = document.querySelector('.start-game');
    const targetSpot = document.querySelector('.target-spot');
    const gameContainer = document.querySelector('.game-container');
    const startPlayer = document.querySelector('.start-game .player'); // 开始界面的人物
    const gamePlayer = document.querySelector('.game-container .player'); // 游戏界面的人物
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    const progressCircles = document.querySelectorAll('.circle');
    const quizModal = document.getElementById('quizModal');
    const textContent = document.getElementById('textContent');
    const quizOptions = document.getElementById('quizOptions');
    const backButton = document.getElementById('backButton');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    
    // 第二个弹窗元素
    const quizModal2 = document.getElementById('quizModal2');
    const textContent2 = document.getElementById('textContent2');
    const quizOptions2 = document.getElementById('quizOptions2');
    const backButton2 = document.getElementById('backButton2');
    const optionA2 = document.getElementById('optionA2');
    const optionB2 = document.getElementById('optionB2');
    
    // 问题3选择A后的新弹窗元素
    const question3AModal = document.getElementById('question3AModal');
const question3AText = document.getElementById('question3AText');
const question3AOptions = document.getElementById('question3AOptions');
const question3ABackButton = document.getElementById('question3ABackButton');
const question3AOptionA = document.getElementById('question3AOptionA');
const question3AOptionB = document.getElementById('question3AOptionB');
const question3AOptionC = document.getElementById('question3AOptionC');

// 问题3A后续新弹窗元素引用
const question3AProceedModal = document.getElementById('question3AProceedModal');
const question3AProceedText = document.getElementById('question3AProceedText');
const question3AProceedOptions = document.getElementById('question3AProceedOptions');

const question3AProceedOptionA = document.getElementById('question3AProceedOptionA');
const question3AProceedOptionB = document.getElementById('question3AProceedOptionB');

// 新剧情分支弹窗元素引用
const forestJourneyModal = document.getElementById('forestJourneyModal');
const forestJourneyText = document.getElementById('forestJourneyText');
const forestJourneyOptions = document.getElementById('forestJourneyOptions');
const forestJourneyBackButton = document.getElementById('forestJourneyBackButton');
const forestJourneyOptionA = document.getElementById('forestJourneyOptionA');
const forestJourneyOptionB = document.getElementById('forestJourneyOptionB');

// 问题3A后续新弹窗选项A点击事件处理
question3AProceedOptionA.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('玩家选择了选项: 拉起ta的手和ta寻找朋友');
    
    // 播放Eternal.mp3音乐
    try {
        // 先尝试获取现有的音频对象
        const backgroundMusic = document.getElementById('backgroundMusic');
        if (backgroundMusic) {
            backgroundMusic.pause(); // 暂停当前播放的音乐
            backgroundMusic.src = 'Eternal.mp3'; // 更改音频源
            backgroundMusic.currentTime = 0; // 重置播放位置
            // 尝试播放新的音乐
            backgroundMusic.play().catch(error => {
                console.warn('音乐播放失败:', error);
            });
        } else {
            // 如果没有找到现有的音频元素，创建新的
            const newAudio = new Audio('Eternal.mp3');
            newAudio.loop = true;
            newAudio.volume = 0.5;
            newAudio.play().catch(error => {
                console.warn('音乐播放失败:', error);
            });
        }
    } catch (error) {
        console.warn('处理音频时出错:', error);
    }
    
    // 隐藏当前弹窗
    question3AProceedModal.classList.remove('active');
    question3AProceedOptions.classList.remove('active');
    
    // 设置特殊标记，表示这是进入最终文字界面的路径
    window.isFinalTextPath = true;
    
    // 显示新剧情分支弹窗
    setTimeout(() => {
        forestJourneyModal.classList.add('active');
        forestJourneyOptions.classList.add('active');
        forestJourneyBackButton.classList.add('active');
    }, 500);
});

// 新剧情分支弹窗选项A点击事件处理
forestJourneyOptionA.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('玩家选择了选项: 拥有去抓住幸福的勇气');
    // 隐藏当前弹窗
    forestJourneyModal.classList.remove('active');
    forestJourneyOptions.classList.remove('active');
    forestJourneyBackButton.classList.remove('active');
    
    // 重置游戏状态，准备进入游戏界面收集光点
    collectedSpots = 0;
    progressCircles.forEach(circle => circle.classList.remove('filled'));
    
    // 设置游戏容器背景
    setGameContainerBackground();
    
    // 激活游戏容器
    gameContainer.classList.add('active');
    
    // 显示游戏中的人物
    if (gamePlayer) {
        gamePlayer.style.display = 'block';
        gamePlayer.style.left = `${positionX}%`;
        gamePlayer.style.bottom = `${positionY}%`;
    }
    
    // 生成游戏中的光点
    setTimeout(generateLightSpots, 1000);
});

// 新剧情分支弹窗选项B点击事件处理
forestJourneyOptionB.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('玩家选择了选项: 逃离孤独，靠近火源');
    // 隐藏当前弹窗
    forestJourneyModal.classList.remove('active');
    forestJourneyOptions.classList.remove('active');
    forestJourneyBackButton.classList.remove('active');
    
    // 重置游戏状态，准备进入游戏界面收集光点
    collectedSpots = 0;
    progressCircles.forEach(circle => circle.classList.remove('filled'));
    
    // 设置游戏容器背景
    setGameContainerBackground();
    
    // 激活游戏容器
    gameContainer.classList.add('active');
    
    // 显示游戏中的人物
    if (gamePlayer) {
        gamePlayer.style.display = 'block';
        gamePlayer.style.left = `${positionX}%`;
        gamePlayer.style.bottom = `${positionY}%`;
    }
    
    // 生成游戏中的光点
    setTimeout(generateLightSpots, 1000);
});

// 新剧情分支弹窗返回按钮点击事件处理
forestJourneyBackButton.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('点击了新剧情分支弹窗返回按钮');
    // 隐藏当前弹窗
    forestJourneyModal.classList.remove('active');
    forestJourneyOptions.classList.remove('active');
    forestJourneyBackButton.classList.remove('active');
    
    // 重置游戏状态
    resetGame();
});

// 问题3A后续新弹窗选项B点击事件处理
question3AProceedOptionB.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('玩家选择了选项: 你拒绝了ta，决定自己去碰运气');
    // 隐藏当前弹窗
    question3AProceedModal.classList.remove('active');
    question3AProceedOptions.classList.remove('active');

    
    // 显示假结局2弹窗
    fakeEnding2Modal.classList.add('active');
});



// 假结局2弹窗元素引用
const fakeEnding2Modal = document.getElementById('fakeEnding2Modal');
const fakeEnding2Text = document.getElementById('fakeEnding2Text');
const fakeEnding2BackButton = document.getElementById('fakeEnding2BackButton');

// 假结局2重新开始按钮点击事件处理
fakeEnding2BackButton.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('点击了假结局2重新开始按钮');
    // 隐藏当前弹窗
    fakeEnding2Modal.classList.remove('active');
    
    // 隐藏所有弹窗和控件
    if (quizModal) quizModal.classList.remove('active');
    if (quizModal2) quizModal2.classList.remove('active');
    if (badEndingModal) badEndingModal.classList.remove('active');
    if (newStoryModal) newStoryModal.classList.remove('active');
    if (newOptionsModal) newOptionsModal.classList.remove('active');
    if (envyEndingModal) envyEndingModal.classList.remove('active');
    if (envyEndingModal2) envyEndingModal2.classList.remove('active');
    if (trueEndingModal2) trueEndingModal2.classList.remove('active');
    if (question3AProceedModal) question3AProceedModal.classList.remove('active');
    if (finalTextModal) finalTextModal.classList.remove('active');
    
    // 隐藏选项和按钮元素
    if (quizOptions) quizOptions.classList.remove('active');
    if (quizOptions2) quizOptions2.classList.remove('active');
    if (backButton) backButton.classList.remove('active');
    if (backButton2) backButton2.classList.remove('active');
    if (newBackButton) newBackButton.classList.remove('active');
    if (newOptions) newOptions.classList.remove('active');
    if (badEndingBackButton) badEndingBackButton.classList.remove('active');
    if (trueEnding2BackButton) trueEnding2BackButton.classList.remove('active');
    if (trueEndingOptions) trueEndingOptions.classList.remove('active');
    if (question3AProceedOptions) question3AProceedOptions.classList.remove('active');

    if (finalTextOptions) finalTextOptions.classList.remove('active');
    if (finalTextBackButton) finalTextBackButton.classList.remove('active');
    if (fakeEnding2BackButton) fakeEnding2BackButton.classList.remove('active');
    
    const controls = document.querySelector('.controls');
    if (controls) {
        controls.classList.remove('active');
        controls.style.display = 'none';
    }
    
    // 重置游戏状态
    collectedSpots = 0;
    isFirstQuizAnswered = false;
    isSecondQuizAnswered = false;
    currentStage = 1; // 重置到第一阶段
    
    // 清除特殊标记
    window.isQuestion3AGame = false;
    window.isRescueGame = false;
    window.isQuestion3AProceed = false;
    window.isFinalTextPath = false;
    
    // 重置游戏容器背景
    if (gameContainer) {
        gameContainer.classList.remove('stage-1', 'stage-2', 'stage-3');
    }
    
    // 重新开始游戏
    setTimeout(() => {
        location.reload();
    }, 500);
});

// 最终文字界面弹窗元素引用
const finalTextModal = document.getElementById('finalTextModal');
const finalText = document.getElementById('finalText');
const finalTextOptions = document.getElementById('finalTextOptions');
const finalTextBackButton = document.getElementById('finalTextBackButton');
const finalTextOptionA = document.getElementById('finalTextOptionA');
const finalTextOptionB = document.getElementById('finalTextOptionB');

// 最终文字界面选项A点击事件处理
finalTextOptionA.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('点击了最终文字界面选项A：想');
    // 隐藏当前弹窗
    finalTextModal.classList.remove('active');
    
    // 显示黑屏元素
    const blackScreen = document.getElementById('blackScreen');
    if (blackScreen) {
        blackScreen.classList.add('active');
    }
});

// 黑屏点击进入真结局弹窗的逻辑
const blackScreen = document.getElementById('blackScreen');
const trueEndingModal = document.getElementById('trueEndingModal');

if (blackScreen && trueEndingModal) {
    blackScreen.addEventListener('click', function() {
        console.log('点击了黑屏，进入真结局');
        // 隐藏黑屏
        blackScreen.classList.remove('active');
        // 显示真结局弹窗
        trueEndingModal.classList.add('active');
    });
}

// 最终文字界面选项B点击事件处理
finalTextOptionB.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    console.log('点击了最终文字界面选项B：不想');
    // 隐藏当前弹窗
    finalTextModal.classList.remove('active');
    
    // 直接显示真结局弹窗
    const trueEndingModal = document.getElementById('trueEndingModal');
    if (trueEndingModal) {
        trueEndingModal.classList.add('active');
    }
});


    
    // 假结局弹窗元素
    const badEndingModal = document.getElementById('badEndingModal');
    const badEndingContent = document.getElementById('badEndingContent');
    const badEndingText = document.getElementById('badEndingText');
    const badEndingBackButton = document.getElementById('badEndingBackButton');
    
    // 新剧情弹窗元素
    const newStoryModal = document.getElementById('newStoryModal');
    const newStoryContent = document.getElementById('newStoryContent');
    const newStoryText = document.getElementById('newStoryText');
    
    // 新选项弹窗元素
    const newOptionsModal = document.getElementById('newOptionsModal');
    const newOptionsContent = document.getElementById('newOptionsContent');
    const newOptionsText = document.getElementById('newOptionsText');
    const newOptions = document.getElementById('newOptions');
    const newOptionA = document.getElementById('newOptionA');
    const newOptionB = document.getElementById('newOptionB');
    const newBackButton = document.getElementById('newBackButton');
    
    // 妒忌结局弹窗元素
    const envyEndingModal = document.getElementById('envyEndingModal');
    const envyEndingContent = document.getElementById('envyEndingContent');
    const envyEndingText = document.getElementById('envyEndingText');
    const envyOptions = document.getElementById('envyOptions');
    const envyOptionA = document.getElementById('envyOptionA');
    const envyOptionB = document.getElementById('envyOptionB');
    const envyOptionC = document.getElementById('envyOptionC');
    const envyBackButton = document.getElementById('envyBackButton');
    
    // 获取第二个冷漠离开后续弹窗（冰河暗涌）相关元素
    const envyEndingModal2 = document.getElementById('envyEndingModal2');
    const envyEndingContent2 = document.getElementById('envyEndingContent2');
    const envyEndingText2 = document.getElementById('envyEndingText2');
    const envyOptions2 = document.getElementById('envyOptions2');
    const envyOptionA2 = document.getElementById('envyOptionA2');
    const envyOptionB2 = document.getElementById('envyOptionB2');
    const envyOptionC2 = document.getElementById('envyOptionC2');
    const envyBackButton2 = document.getElementById('envyBackButton2');
    
    // 游戏状态变量 - 用于跟踪当前是第几个弹窗
    let currentStage = 1; // 1: 第一个弹窗阶段, 2: 第二个弹窗阶段
    
    // 当前活动的玩家元素
    let player = startPlayer; // 默认使用开始界面的人物
    // 游戏状态变量
    let positionX = 50; // 小人水平位置（百分比）
    let positionY = 30; // 小人垂直位置（百分比，底部为基准）
    const groundHeight = 30; // 地面高度（与CSS一致）
    let isJumping = false; // 跳跃状态标记
    let jumpForce = 0; // 跳跃力度
    let collectedSpots = 0; // 收集的光点数量
    const maxSpots = 3; // 最大光点数量（对应3个进度圈）
    let isFirstQuizAnswered = false; // 第一题是否已回答
    let isSecondQuizAnswered = false; // 第二题是否已回答
    
    // 2. 页面初始化与游戏启动
    setTimeout(() => {
        blackMask.style.opacity = '0';
    }, 100);
    
    // 点击任意位置启动游戏
    document.addEventListener('click', function startGame() {
        startText.style.opacity = '0';
        blackMask.style.opacity = '0';
        startgame.classList.add('active');
        
        // 游戏开始时先播放背景音乐
        playMusic('bayinhe');
        
        // 创建流水声
        createWaterSound();
        
        // 生成固定目标光点并确保显示
        generateTargetSpot();
        targetSpot.style.display = 'block'; // 确保目标光点可见

        // 显示开始界面的人物
        startPlayer.style.display = 'block';
        startPlayer.style.left = `${positionX}%`;
        startPlayer.style.bottom = `${positionY}%`;

        // 移除黑幕（动画结束后）
        setTimeout(() => {
            blackMask.style.display = 'none';
        }, 2000);
        
        // 移除事件监听器，确保只触发一次
        document.removeEventListener('click', startGame);
    });
    


    // 3. 音频效果（流水声）和背景音乐
    // 初始化音频上下文
    let audioContext = null;

    // 音频对象存储
    let audioFiles = {};

    // 预加载音乐文件 - 简化版
    function preloadAudio() {
        // 初始化音频对象存储
        audioFiles = {};
        
        // 简化的音频文件列表
        const audioNames = [
            {id: 'trauma', path: 'Trauma.mp3'},
            {id: 'areYouLost', path: 'Are you lost.mp3'},
            {id: 'bayinhe', path: 'bayinhe.mp3'}
        ];
        
        // 逐个创建音频对象，避免同时创建过多导致错误
        audioNames.forEach(audioInfo => {
            try {
                const audio = new Audio(audioInfo.path);
                audio.loop = true;
                audio.volume = 0.5;
                audioFiles[audioInfo.id] = audio;
            } catch (e) {
                console.warn(`创建音频对象 ${audioInfo.id} 失败:`, e);
            }
        });
    }

    // 播放指定音乐 - 简化版
function playMusic(musicName) {
    try {
        // 先停止所有音乐
        if (audioFiles && typeof audioFiles === 'object') {
            Object.values(audioFiles).forEach(audio => {
                if (audio && typeof audio.pause === 'function') {
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                    } catch (e) {
                        // 静默处理错误，不影响其他功能
                    }
                }
            });
        }
        
        // 播放指定音乐
        if (audioFiles && audioFiles[musicName]) {
            const audio = audioFiles[musicName];
            
            // 简单的播放尝试
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // 播放失败时，静默处理，避免抛出错误
                    // 尝试在用户下次交互时播放
                    const handleUserInteraction = () => {
                        audio.play().catch(() => {}); // 忽略错误
                        document.removeEventListener('click', handleUserInteraction);
                        document.removeEventListener('keydown', handleUserInteraction);
                    };
                    document.addEventListener('click', handleUserInteraction);
                    document.addEventListener('keydown', handleUserInteraction);
                });
            }
        }
    } catch (error) {
        // 静默处理所有错误，确保游戏能继续运行
    }
}

// 停止所有音乐 - 增强版带错误处理
function stopAllMusic() {
    try {
        if (audioFiles && typeof audioFiles === 'object') {
            Object.values(audioFiles).forEach(audio => {
                if (audio && typeof audio.pause === 'function') {
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                    } catch (e) {
                        console.warn('停止音频时出错:', e);
                    }
                }
            });
        }
    } catch (error) {
        console.error('停止所有音乐时发生错误:', error);
    }
}

// 重置游戏函数
function resetGame() {
    // 停止所有音乐
    stopAllMusic();
    
    // 隐藏所有弹窗和控件
    if (quizModal) quizModal.classList.remove('active');
    if (quizModal2) quizModal2.classList.remove('active');
    if (badEndingModal) badEndingModal.classList.remove('active');
    if (question3AModal) question3AModal.classList.remove('active');
    if (question3AProceedModal) question3AProceedModal.classList.remove('active');
    if (finalTextModal) finalTextModal.classList.remove('active');
    if (trueEndingModal) trueEndingModal.classList.remove('active');
    if (trueEndingModal2) trueEndingModal2.classList.remove('active');
    
    // 隐藏选项和按钮元素
    if (quizOptions) quizOptions.classList.remove('active');
    if (quizOptions2) quizOptions2.classList.remove('active');
    if (backButton) backButton.classList.remove('active');
    if (backButton2) backButton2.classList.remove('active');
    if (question3AOptions) question3AOptions.classList.remove('active');
    if (question3ABackButton) question3ABackButton.classList.remove('active');
    
    const controls = document.querySelector('.controls');
    if (controls) {
        controls.classList.remove('active');
        controls.style.display = 'none';
    }
    
    // 重置游戏状态
    collectedSpots = 0;
    isFirstQuizAnswered = false;
    isSecondQuizAnswered = false;
    currentStage = 1; // 重置到第一阶段
    
    // 清除特殊标记
    window.isQuestion3AGame = false;
    window.isRescueGame = false;
    window.isQuestion3AProceed = false;
    window.isFinalTextPath = false;
    
    // 重置游戏容器背景
    if (gameContainer) {
        gameContainer.classList.remove('stage-1', 'stage-2', 'stage-3');
    }
    
    // 重新开始游戏
    setTimeout(() => {
        location.reload();
    }, 500);
}

    // 创建流水声
    function createWaterSound() {
        // 由于音频已经在DOMContentLoaded时预加载，这里不需要再调用preloadAudio()
        // 避免重复加载和可能的音频错误
        // 暂时不自动播放音乐，让游戏流程正常启动
    }
    
    

    // 4. 光点生成（仅在人物可跳到的范围内）
function generateLightSpots() {
    // 清除现有光点
    document.querySelectorAll('.light-spot').forEach(spot => spot.remove());
    
    // 计算人物可触及的完整范围
    const jumpMaxRise = 36; // 跳跃总高度(8+7+...+1)
    const verticalMin = groundHeight; // 地面高度(30%)
    const verticalMax = groundHeight + jumpMaxRise; // 最大跳跃高度(66%)
    const horizontalMin = 10; // 人物可移动的左边界
    const horizontalMax = 90; // 人物可移动的右边界
    
    // 为了让光点更分散，将范围划分为多个子区域
    // 水平方向分3个区域，垂直方向分3个区域，共9个区域
    const horizontalSegments = 3;
    const verticalSegments = 3;
    const horizontalStep = (horizontalMax - horizontalMin) / horizontalSegments;
    const verticalStep = (verticalMax - verticalMin) / verticalSegments;
    
    // 记录已使用的区域，避免光点集中在同一区域
    const usedSegments = new Set();
    
    for (let i = 0; i < maxSpots; i++) {
        const spot = document.createElement('div');
        spot.classList.add('light-spot');
        
        // 选择一个未使用的区域，确保分散
        let segmentKey;
        do {
            const hSegment = Math.floor(Math.random() * horizontalSegments);
            const vSegment = Math.floor(Math.random() * verticalSegments);
            segmentKey = `${hSegment}-${vSegment}`;
        } while (usedSegments.has(segmentKey) && usedSegments.size < horizontalSegments * verticalSegments);
        
        usedSegments.add(segmentKey);
        const [hSegment, vSegment] = segmentKey.split('-').map(Number);
        
        // 在选定的区域内生成随机位置
        const spotX = Math.floor(
            Math.random() * horizontalStep + horizontalMin + hSegment * horizontalStep
        );
        const spotY = Math.floor(
            Math.random() * verticalStep + verticalMin + vSegment * verticalStep
        );
        
        spot.style.left = `${spotX}%`;
        spot.style.bottom = `${spotY}%`;
        
        gameContainer.appendChild(spot);
    }
}
    
// 生成固定在人物初始头顶的目标光点（作为“终点”）
function generateTargetSpot() {
  // 人物初始位置（和你代码中positionX、positionY的初始值保持一致）
  const playerInitialX = 50; // 人物初始水平位置（百分比）
  const playerInitialY = 30; // 人物初始垂直位置（百分比，地面高度）
  
  // 光点相对于人物头顶的偏移量（可调整）
  const offsetX = 0; // 水平偏移（0=正上方）
  const offsetY = 15; // 垂直偏移（15=在人物头顶上方15%的位置，需要跳跃才能碰到）
  
  // 计算光点的固定位置（基于人物初始位置+偏移量）
  const spotX = playerInitialX + offsetX;
  const spotY = playerInitialY + offsetY;

  // 设置光点位置（固定不变）
  targetSpot.style.left = `${spotX}%`;
  targetSpot.style.bottom = `${spotY}%`;
}

    // 5. 碰撞检测（优化：扩大可收集范围，大致碰到即收集）
function checkCollision() {
        // 使用当前活动的player元素
        const playerRect = player.getBoundingClientRect();
        // 扩大小人的碰撞范围（向四周各扩展15px）
        const extendedPlayerRect = {
            left: playerRect.left - 15,
            right: playerRect.right + 15,
            top: playerRect.top - 15,
            bottom: playerRect.bottom + 15
        };
        
        // 只在游戏界面激活时检查与随机光点的碰撞
        if (gameContainer.classList.contains('active')) {
            document.querySelectorAll('.light-spot').forEach(spot => {
                const spotRect = spot.getBoundingClientRect();
                
                // 宽松的碰撞条件：扩展后的小人范围与光点有重叠即收集
                if (
                    extendedPlayerRect.left < spotRect.right &&
                    extendedPlayerRect.right > spotRect.left &&
                    extendedPlayerRect.top < spotRect.bottom &&
                    extendedPlayerRect.bottom > spotRect.top
                ) {
                    // 收集光点
                    spot.remove();
                    collectedSpots++;
                    
                    // 当小人第一次吃到光点时播放Trauma.mp3
                    if (collectedSpots === 1) {
                        try {
                            playMusic('trauma');
                            console.log('小人吃到第一个光点，开始播放Trauma音乐');
                        } catch (error) {
                            console.warn('播放Trauma音乐失败:', error);
                        }
                    }
                    
                    // 填充进度圈
                    if (collectedSpots <= maxSpots) {
                        progressCircles[collectedSpots - 1].classList.add('filled');
                    }
                    
                    // 集满3个光点，根据当前阶段显示对应的弹窗
                    if (collectedSpots === maxSpots) {
                        setTimeout(() => {
                            // 检查是否是最终文字路径模式
                            if (window.isFinalTextPath) { 
                                // 显示最终文字界面弹窗，并确保选项和返回按钮默认可见
                                finalTextModal.classList.add('active');
                                finalTextOptions.classList.add('active');
                                finalTextBackButton.classList.add('active');
                                // 清除特殊标记
                                window.isFinalTextPath = false;
                            } 
                            // 检查是否是问题3A后续游戏模式
                            else if (window.isQuestion3AProceed) { 
                                // 显示问题3A后续新弹窗，并确保选项和返回按钮默认可见
                                question3AProceedModal.classList.add('active');
                                question3AProceedOptions.classList.add('active');
                            
                            } 
                            // 检查是否是问题3选择A后的游戏或从'集齐荧光拯救TA'选项进入的游戏
                            else if (window.isQuestion3AGame || window.isRescueGame) { 
                                // 播放"Trauma"音乐
                                playMusic('trauma');
                                // 显示问题3选择A后的弹窗，并确保选项和返回按钮默认可见
                                question3AModal.classList.add('active');
                                question3AOptions.classList.add('active');
                                question3ABackButton.classList.add('active');
                            // 隐藏游戏界面
                            gameContainer.classList.remove('active');
                            if (gamePlayer) {
                                gamePlayer.style.display = 'none';
                            }
                            // 重置特殊标记
                            window.isQuestion3AGame = false;
                            window.isRescueGame = false;
                            } else {
                                // 常规逻辑
                                if (currentStage === 1) {
                                    quizModal.classList.add('active');
                                } else if (currentStage === 2) {
                                    quizModal2.classList.add('active');
                                }
                            }
                        }, 500);
                    }
                }
            });
        }
        
        // 检查与固定光点的碰撞
        if (targetSpot && targetSpot.style.display !== 'none') {
            const fixedLightRect = targetSpot.getBoundingClientRect();
            if (
                extendedPlayerRect.left < fixedLightRect.right &&
                extendedPlayerRect.right > fixedLightRect.left &&
                extendedPlayerRect.top < fixedLightRect.bottom &&
                extendedPlayerRect.bottom > fixedLightRect.top
            ) {
                // 碰到固定光点后：隐藏光点，显示游戏界面
                targetSpot.style.display = 'none';
                
                // 切换到游戏界面的人物
                player = gamePlayer;
                gamePlayer.style.display = 'block';
                gamePlayer.style.left = `${positionX}%`;
                gamePlayer.style.bottom = `${positionY}%`;
                
                // 激活游戏容器
                gameContainer.classList.add('active');
                
                // 生成游戏中的光点
                generateLightSpots();
                
                // 隐藏开始界面（缩短延迟时间）
                setTimeout(() => {
                    startgame.style.opacity = '0';
                    // 直接隐藏开始界面，不再有额外延迟
                    startgame.style.display = 'none';
                }, 100); // 从500ms减少到100ms
            }
        }
}

    // 6. 跳跃逻辑（超级玛丽式抛物线）
    function jump() {
        if (isJumping) return;
        
        isJumping = true;
        jumpForce = 8; // 跳跃高度
        
        const jumpInterval = setInterval(() => {
            // 上升阶段
            if (jumpForce > 0) {
                positionY += jumpForce;
                jumpForce -= 1; // 重力衰减
            } 
            // 下降阶段
            else if (positionY > groundHeight) {
                positionY -= 8;
            } 
            // 落地
            else {
                positionY = groundHeight;
                clearInterval(jumpInterval);
                isJumping = false;
            }
            
            // 更新当前活动小人的位置
            player.style.bottom = `${positionY}%`;
            // 跳跃过程中持续检测碰撞
            checkCollision();
        }, 30);
    }
    
    // 7. 操控逻辑（左右移动+跳跃）
    // 按钮控制
    leftBtn.addEventListener('click', () => {
        if (positionX > 10) {
            positionX -= 5;
            player.style.left = `${positionX}%`;
            checkCollision();
        }
    });
    
    rightBtn.addEventListener('click', () => {
        if (positionX < 90) {
            positionX += 5;
            player.style.left = `${positionX}%`;
            checkCollision();
        }
    });
    
    jumpBtn.addEventListener('click', jump);
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                if (positionX > 10) {
                    positionX -= 5;
                    player.style.left = `${positionX}%`;
                    checkCollision();
                }
                break;
            case 'ArrowRight':
                if (positionX < 90) {
                    positionX += 5;
                    player.style.left = `${positionX}%`;
                    checkCollision();
                }
                break;
            case 'ArrowUp':
                jump();
                break;
        }
    });
    
    // 触摸控制（左右滑动+上下滑动跳跃+点击跳跃）
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    // 改进的触摸开始处理
    document.addEventListener('touchstart', (e) => {
        // 防止默认行为，特别是在iOS上的滚动
        e.preventDefault();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now(); // 记录触摸开始时间
    }, { passive: false });

    // 改进的触摸结束处理
    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const touchDuration = Date.now() - touchStartTime; // 计算触摸持续时间

        // 调整移动阈值，使其在移动设备上更加灵敏
        const movementThreshold = 20; // 降低阈值以提高灵敏度
        const tapThreshold = 200; // 点击持续时间阈值（毫秒）

        // 优先判断上下滑动（往上滑触发跳跃）
        if (diffY < -movementThreshold) {
            jump();
        } 
        // 左右滑动移动
        else if (diffX > movementThreshold && positionX < 90) {
            // 根据滑动距离调整移动速度，使控制更自然
            const moveAmount = Math.min(15, Math.abs(diffX) / 10);
            positionX += moveAmount;
            if (positionX > 90) positionX = 90; // 确保不超出边界
            player.style.left = `${positionX}%`;
            checkCollision();
        } else if (diffX < -movementThreshold && positionX > 10) {
            const moveAmount = Math.min(15, Math.abs(diffX) / 10);
            positionX -= moveAmount;
            if (positionX < 10) positionX = 10; // 确保不超出边界
            player.style.left = `${positionX}%`;
            checkCollision();
        }
        // 点击（短时间触摸）也触发跳跃
        else if (Math.abs(diffX) < movementThreshold && Math.abs(diffY) < movementThreshold && touchDuration < tapThreshold) {
            jump();
        }
        
        // 重置起始坐标和时间
        touchStartX = 0;
        touchStartY = 0;
        touchStartTime = 0;
    }, { passive: false });
    
    // 添加触摸移动事件监听，提供更实时的反馈
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    // 8. 文字界面和选项的交互逻辑
    // 获取quiz-content元素
    const quizContent = document.querySelector('#quizModal .quiz-content');
    const quizContent2 = document.querySelector('#quizModal2 .quiz-content');
    
    // 第一个弹窗 - 文字界面点击事件 - 显示选项
    quizContent.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === quizOptions || quizOptions.contains(e.target) || 
            e.target === backButton || backButton.contains(e.target)) {
            return;
        }
        
        textContent.style.opacity = '0.3'; // 文字透明度降低
        quizOptions.classList.add('active'); // 显示选项
        backButton.classList.add('active'); // 显示返回按钮
    });
    
    // 第二个弹窗 - 文字界面点击事件 - 显示选项
    quizContent2.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === quizOptions2 || quizOptions2.contains(e.target) || 
            e.target === backButton2 || backButton2.contains(e.target)) {
            return;
        }
        
        textContent2.style.opacity = '0.3'; // 文字透明度降低
        quizOptions2.classList.add('active'); // 显示选项
        backButton2.classList.add('active'); // 显示返回按钮
    });
    
    // 第一个弹窗 - 返回按钮点击事件 - 返回文字界面
    backButton.addEventListener('click', () => {
        textContent.style.opacity = '1'; // 文字恢复正常显示
        quizOptions.classList.remove('active'); // 隐藏选项
        backButton.classList.remove('active'); // 隐藏返回按钮
    });
    
    // 第二个弹窗 - 返回按钮点击事件 - 返回文字界面
    backButton2.addEventListener('click', () => {
        textContent2.style.opacity = '1'; // 文字恢复正常显示
        quizOptions2.classList.remove('active'); // 隐藏选项
        backButton2.classList.remove('active'); // 隐藏返回按钮
    });
    
    // 选项A2点击事件
    optionA2.addEventListener('click', () => {
        // 点击A选项时，先显示新故事弹窗（树洞事件描述）
        quizModal2.classList.remove('active');
        setTimeout(() => {
            newStoryModal.classList.add('active');
        }, 500);
    });

    // 新故事弹窗点击事件 - 点击弹窗任意位置显示选项弹窗
    newStoryContent.addEventListener('click', () => {
        // 隐藏故事弹窗
        newStoryModal.classList.remove('active');
        setTimeout(() => {
            // 显示选项弹窗
            newOptionsModal.classList.add('active');
            // 初始状态：只显示文字，不显示选项和返回按钮
            newOptionsText.style.opacity = '1';
            newOptions.classList.remove('active');
            newBackButton.classList.remove('active');
        }, 500);
    });

    // 新选项弹窗点击事件 - 点击弹窗任意位置显示选项
    // 已在前面声明，无需重复声明
    // const newOptionsContent = document.querySelector('#newOptionsModal .quiz-content');
    newOptionsContent.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === newOptions || newOptions.contains(e.target) || 
            e.target === newBackButton || newBackButton.contains(e.target)) {
            return;
        }
        
        newOptionsText.style.opacity = '0.3'; // 文字透明度降低
        newOptions.classList.add('active'); // 显示选项
        newBackButton.classList.add('active'); // 显示返回按钮
    });

    // 新选项弹窗 - 返回按钮点击事件 - 返回文字界面
    newBackButton.addEventListener('click', () => {
        // 直接在当前弹窗内调整UI，而不是切换到另一个弹窗
        newOptionsText.style.opacity = '1'; // 文字恢复正常显示
        newOptions.classList.remove('active'); // 隐藏选项
        newBackButton.classList.remove('active'); // 隐藏返回按钮
    });

    // 新选项A点击事件
    newOptionA.addEventListener('click', () => {
        console.log('玩家选择了选项: 集齐荧光拯救TA');
        // 播放bayinhe.mp3音乐
        try {
            // 先尝试获取现有的音频对象
            const backgroundMusic = document.getElementById('backgroundMusic');
            if (backgroundMusic) {
                backgroundMusic.pause(); // 暂停当前播放的音乐
                backgroundMusic.src = 'bayinhe.mp3'; // 更改音频源
                backgroundMusic.currentTime = 0; // 重置播放位置
                // 尝试播放新的音乐
                backgroundMusic.play().catch(error => {
                    console.warn('音乐播放失败:', error);
                });
            } else {
                // 如果没有找到现有的音频元素，创建新的
                const newAudio = new Audio('bayinhe.mp3');
                newAudio.loop = true;
                newAudio.volume = 0.5;
                newAudio.play().catch(error => {
                    console.warn('音乐播放失败:', error);
                });
            }
        } catch (error) {
            console.warn('处理音频时出错:', error);
        }
        
        // 隐藏当前弹窗
        newOptionsModal.classList.remove('active');
        
        // 重置游戏状态，准备进入游戏界面收集光点
        collectedSpots = 0;
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 激活游戏容器
        gameContainer.classList.add('active');
        
        // 显示游戏中的人物
        if (gamePlayer) {
            gamePlayer.style.display = 'block';
            gamePlayer.style.left = `${positionX}%`;
            gamePlayer.style.bottom = `${positionY}%`;
        }
        
        // 生成游戏中的光点
        setTimeout(generateLightSpots, 1000);
        
        // 设置特殊标记，表示这是从"集齐荧光拯救TA"选项进入的游戏
        window.isRescueGame = true;
    });

    // 新选项B点击事件
    newOptionB.addEventListener('click', () => {
        console.log('玩家选择了选项: 冷漠离开');
        // 播放Evol.mp3音乐
        try {
            // 先尝试获取现有的音频对象
            const backgroundMusic = document.getElementById('backgroundMusic');
            if (backgroundMusic) {
                backgroundMusic.pause(); // 暂停当前播放的音乐
                backgroundMusic.src = 'Evol.mp3'; // 更改音频源
                backgroundMusic.currentTime = 0; // 重置播放位置
                // 尝试播放新的音乐
                backgroundMusic.play().catch(error => {
                    console.warn('音乐播放失败:', error);
                });
            } else {
                // 如果没有找到现有的音频元素，创建新的
                const newAudio = new Audio('Evol.mp3');
                newAudio.loop = true;
                newAudio.volume = 0.5;
                newAudio.play().catch(error => {
                    console.warn('音乐播放失败:', error);
                });
            }
        } catch (error) {
            console.warn('处理音频时出错:', error);
        }
        
        // 隐藏当前弹窗，根据currentStage显示对应的冷漠离开后续弹窗
        newOptionsModal.classList.remove('active');
        setTimeout(() => {
            if (currentStage === 1) {
                // 第一阶段：显示第一个弹窗
                envyEndingModal.classList.add('active');
                // 初始状态：只显示文字，不显示选项和返回按钮
                envyEndingText.style.opacity = '1';
                envyOptions.classList.remove('active');
                envyBackButton.classList.remove('active');
            } else if (currentStage === 2) {
                // 第二阶段：显示第二个弹窗（冰河暗涌）
                envyEndingModal2.classList.add('active');
                // 初始状态：只显示文字，不显示选项和返回按钮
                envyEndingText2.style.opacity = '1';
                envyOptions2.classList.remove('active');
                envyBackButton2.classList.remove('active');
            }
        }, 500);
    });
    
    // 冷漠离开后续弹窗 - 文字界面点击事件 - 显示选项（与问题1和问题2保持一致的实现方式）
    envyEndingContent.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === envyOptions || envyOptions.contains(e.target) || 
            e.target === envyBackButton || envyBackButton.contains(e.target)) {
            return;
        }
        
        envyEndingText.style.opacity = '0.3'; // 文字透明度降低
        envyOptions.classList.add('active'); // 显示选项
        envyBackButton.classList.add('active'); // 显示返回按钮
    });
    
    // 冷漠离开后续弹窗 - 返回按钮点击事件 - 返回文字界面
    envyBackButton.addEventListener('click', () => {
        envyEndingText.style.opacity = '1'; // 文字恢复正常显示
        envyOptions.classList.remove('active'); // 隐藏选项
        envyBackButton.classList.remove('active'); // 隐藏返回按钮
    });
    
    // 第二个冷漠离开后续弹窗（冰河暗涌） - 文字界面点击事件 - 显示选项
    envyEndingContent2.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === envyOptions2 || envyOptions2.contains(e.target) || 
            e.target === envyBackButton2 || envyBackButton2.contains(e.target)) {
            return;
        }
        
        envyEndingText2.style.opacity = '0.3'; // 文字透明度降低
        envyOptions2.classList.add('active'); // 显示选项
        envyBackButton2.classList.add('active'); // 显示返回按钮
    });
    
    // 第二个冷漠离开后续弹窗（冰河暗涌） - 返回按钮点击事件 - 返回文字界面
    envyBackButton2.addEventListener('click', () => {
        envyEndingText2.style.opacity = '1'; // 文字恢复正常显示
        envyOptions2.classList.remove('active'); // 隐藏选项
        envyBackButton2.classList.remove('active'); // 隐藏返回按钮
    });
    
    // 冷漠离开后续弹窗 - 选项A点击事件
    envyOptionA.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 认为ta是一个麻烦');
        // 确保元素存在
        if (envyEndingModal && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal.classList.remove('active');
            envyEndingModal.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 冷漠离开后续弹窗 - 选项B点击事件
    envyOptionB.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 妒忌ta的笑容，妒忌ta的勇敢，妒忌ta拥有你渴望的一切');
        // 确保元素存在
        if (envyEndingModal && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal.classList.remove('active');
            envyEndingModal.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 冷漠离开后续弹窗 - 选项C点击事件
    envyOptionC.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 你想逃离');
        // 确保元素存在
        if (envyEndingModal && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal.classList.remove('active');
            envyEndingModal.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 第二个冷漠离开后续弹窗（冰河暗涌） - 选项A点击事件
    envyOptionA2.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 认为ta是一个麻烦');
        // 确保元素存在
        if (envyEndingModal2 && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal2.classList.remove('active');
            envyEndingModal2.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 第二个冷漠离开后续弹窗（冰河暗涌） - 选项B点击事件
    envyOptionB2.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 妒忌ta的笑容，妒忌ta的勇敢，妒忌ta拥有你渴望的一切');
        // 确保元素存在
        if (envyEndingModal2 && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal2.classList.remove('active');
            envyEndingModal2.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 第二个冷漠离开后续弹窗（冰河暗涌） - 选项C点击事件
    envyOptionC2.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('玩家选择了选项: 你想逃离');
        // 确保元素存在
        if (envyEndingModal2 && trueEndingModal2 && trueEnding2BackButton) {
            // 强制移除并重新添加class，确保样式更新
            envyEndingModal2.classList.remove('active');
            envyEndingModal2.style.display = 'none'; // 临时隐藏
            setTimeout(() => {
                // 强制显示真结局2弹窗
                trueEndingModal2.style.display = 'flex';
                trueEndingModal2.classList.remove('active');
                void trueEndingModal2.offsetWidth; // 触发重排
                trueEndingModal2.classList.add('active');
                // 确保按钮可见
                trueEnding2BackButton.classList.add('active');
            }, 300); // 缩短延迟时间
        }
    });
    
    // 获取真结局2弹窗相关元素
    const trueEndingContent2 = document.querySelector('#trueEndingModal2 .quiz-content');
    const trueEndingText2 = document.getElementById('trueEndingText2');
    const trueEndingOptions = document.getElementById('trueEndingOptions');
    const trueEndingOptionA = document.getElementById('trueEndingOptionA');
    const trueEndingOptionB = document.getElementById('trueEndingOptionB');
    const trueEndingOptionC = document.getElementById('trueEndingOptionC');
    
    // 真结局2弹窗 - 文字界面点击事件 - 显示选项
    trueEndingContent2.addEventListener('click', (e) => {
        // 避免点击选项或返回按钮时触发
        if (e.target === trueEndingOptions || trueEndingOptions.contains(e.target) || 
            e.target === trueEnding2BackButton || trueEnding2BackButton.contains(e.target)) {
            return;
        }
        
        trueEndingText2.style.opacity = '0.3'; // 文字透明度降低
        trueEndingOptions.classList.add('active'); // 显示选项
        trueEnding2BackButton.classList.add('active'); // 显示返回按钮
    });
    
    // 真结局2弹窗选项点击事件 - 选项已经全部显示在页面上，点击后直接重新开始
    trueEndingOptionA.addEventListener('click', () => {
        console.log('玩家选择了选项A: 为什么不救我？');
        // 这里不做特殊处理，因为内容已经全部显示
    });
    
    trueEndingOptionB.addEventListener('click', () => {
        console.log('玩家选择了选项B: 为什么不救我？');
        // 这里不做特殊处理，因为内容已经全部显示
    });
    
    trueEndingOptionC.addEventListener('click', () => {
        console.log('玩家选择了选项C: 为什么不救我？');
        // 这里不做特殊处理，因为内容已经全部显示
    });
    
    // 真结局2弹窗重新开始按钮点击事件
    trueEnding2BackButton.addEventListener('click', () => {
        trueEndingModal2.classList.remove('active');
        
        // 隐藏所有弹窗和控件
        if (quizModal) quizModal.classList.remove('active');
        if (quizModal2) quizModal2.classList.remove('active');
        if (badEndingModal) badEndingModal.classList.remove('active');
        if (newStoryModal) newStoryModal.classList.remove('active');
        if (newOptionsModal) newOptionsModal.classList.remove('active');
        if (envyEndingModal) envyEndingModal.classList.remove('active');
        if (trueEndingModal2) trueEndingModal2.classList.remove('active');
        
        // 隐藏选项和按钮元素
        if (quizOptions) quizOptions.classList.remove('active');
        if (quizOptions2) quizOptions2.classList.remove('active');
        if (backButton) backButton.classList.remove('active');
        if (backButton2) backButton2.classList.remove('active');
        if (newBackButton) newBackButton.classList.remove('active');
        if (newOptions) newOptions.classList.remove('active');
        if (badEndingBackButton) badEndingBackButton.classList.remove('active');
        if (trueEnding2BackButton) trueEnding2BackButton.classList.remove('active');
        if (trueEndingOptions) trueEndingOptions.classList.remove('active');
        
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.classList.remove('active');
            controls.style.display = 'none';
        }
        
        // 重置游戏状态
        collectedSpots = 0;
        isFirstQuizAnswered = false;
        isSecondQuizAnswered = false;
        
        // 重新开始游戏
        setTimeout(() => {
            location.reload();
        }, 500);
    });
    optionB2.addEventListener('click', () => {
        console.log('玩家选择了选项B2: 不可以');
        
        // 停止当前正在播放的所有音乐
        stopAllMusic();
        
        // 播放"Are you lost"音乐
        playMusic('areYouLost');
        // 点击B选项时，直接显示假结局弹窗
        quizModal2.classList.remove('active');
        setTimeout(() => {
            badEndingModal.classList.add('active');
            // 添加这一行，确保按钮可见
            badEndingBackButton.classList.add('active');
        }, 500);
    });

    // 假结局弹窗重新开始按钮点击事件
    badEndingBackButton.addEventListener('click', () => {
        badEndingModal.classList.remove('active');
        
        // 隐藏所有弹窗和控件
        if (quizModal) quizModal.classList.remove('active');
        if (quizModal2) quizModal2.classList.remove('active');
        if (badEndingModal) badEndingModal.classList.remove('active');
        if (newStoryModal) newStoryModal.classList.remove('active');
        if (newOptionsModal) newOptionsModal.classList.remove('active');
        
        // 隐藏选项和按钮元素
        if (quizOptions) quizOptions.classList.remove('active');
        if (quizOptions2) quizOptions2.classList.remove('active');
        if (backButton) backButton.classList.remove('active');
        if (backButton2) backButton2.classList.remove('active');
        if (newBackButton) newBackButton.classList.remove('active');
        if (newOptions) newOptions.classList.remove('active');
        if (badEndingBackButton) badEndingBackButton.classList.remove('active');
        
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.classList.remove('active');
            controls.style.display = 'none';
        }
        
        // 重置游戏状态
        collectedSpots = 0;
        isFirstQuizAnswered = false;
        isSecondQuizAnswered = false;
        currentStage = 1; // 重置到第一阶段
        positionX = 50; // 重置位置
        positionY = 30;
        isJumping = false;
        jumpForce = 0;
        player = startPlayer; // 重置玩家元素引用
        
        // 重置进度圆圈
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 显示开始界面
        setTimeout(() => {
            // 重置开始界面
            if (startText) startText.style.opacity = '1';
            if (blackMask) {
                blackMask.style.display = 'block';
                blackMask.style.opacity = '1';
            }
            if (startgame) {
                startgame.classList.remove('active');
                startgame.style.display = 'block';
                startgame.style.opacity = '1';
            }
            
            // 确保玩家角色正确显示在开始界面
            if (startPlayer) {
                startPlayer.style.display = 'block';
                startPlayer.style.left = '50%';
                startPlayer.style.bottom = '30%';
            }
            if (gamePlayer) {
                gamePlayer.style.display = 'none';
            }
            
            // 移除现有的游戏元素
            if (gameContainer) {
                gameContainer.classList.remove('active');
                // 清空游戏容器中的光点
                const lightSpots = gameContainer.querySelectorAll('.light-spot');
                lightSpots.forEach(spot => spot.remove());
            }
            
            // 重新绑定开始游戏事件
            document.addEventListener('click', function startGame() {
                if (startText) startText.style.opacity = '0';
                if (startgame) {
                    startgame.classList.add('active');
                    startgame.style.display = 'block';
                }
                if (targetSpot) targetSpot.style.display = 'block';
                if (startPlayer) {
                    startPlayer.style.display = 'block';
                    startPlayer.style.left = '50%';
                    startPlayer.style.bottom = '30%';
                }
                if (blackMask) blackMask.style.display = 'none';
                document.removeEventListener('click', startGame);
            });
        }, 100);
});
    
    // 设置游戏容器背景的函数
    function setGameContainerBackground() {
        // 移除所有阶段背景类
        gameContainer.classList.remove('stage-1', 'stage-2', 'stage-3');
        
        // 根据当前阶段或特殊标记设置背景
        if (window.isQuestion3AGame || window.isQuestion3AProceed) {
            // 问题3A相关的游戏，使用第三阶段背景
            gameContainer.classList.add('stage-3');
        } else if (window.isRescueGame) {
            // "集齐荧光拯救TA"后的游戏界面，使用第二阶段背景（与"你手中的光芒似乎"弹窗相同）
            gameContainer.classList.add('stage-2');
        } else {
            // 默认使用第一阶段背景（first-pic），确保问题1A后的游戏也使用first-pic
            gameContainer.classList.add('stage-1');
        }
    }
    
    // 处理选项选择的函数
    function handleOptionSelection(option, stage) {
        console.log('玩家在第', stage, '阶段选择了选项:', option);
        
        // 关闭对应的问答界面
        if (stage === 1) {
            quizModal.classList.remove('active');
            
            // 重置文字界面和选项的状态
            setTimeout(() => {
                textContent.style.opacity = '1';
                quizOptions.classList.remove('active');
                backButton.classList.remove('active');
            }, 500);
            
            // 进入第二阶段
            currentStage = 2;
            
            // 设置游戏容器背景
            setGameContainerBackground();
            
            // 激活游戏容器
            gameContainer.classList.add('active');
            
            // 显示游戏中的人物
            if (gamePlayer) {
                gamePlayer.style.display = 'block';
                gamePlayer.style.left = `${positionX}%`;
                gamePlayer.style.bottom = `${positionY}%`;
            }
        } else if (stage === 2 && option === 'A') {
            // 问题3选择A选项的特殊处理
            quizModal2.classList.remove('active');
            
            // 重置文字界面和选项的状态
            setTimeout(() => {
                textContent2.style.opacity = '1';
                quizOptions2.classList.remove('active');
                backButton2.classList.remove('active');
            }, 500);
            
            // 重置游戏状态，准备进入游戏界面收集光点
            collectedSpots = 0;
            progressCircles.forEach(circle => circle.classList.remove('filled'));
            
            // 设置游戏容器背景
            setGameContainerBackground();
            
            // 激活游戏容器
            gameContainer.classList.add('active');
            
            // 显示游戏中的人物
            if (gamePlayer) {
                gamePlayer.style.display = 'block';
                gamePlayer.style.left = `${positionX}%`;
                gamePlayer.style.bottom = `${positionY}%`;
            }
            
            // 生成游戏中的光点
            setTimeout(generateLightSpots, 1000);
            
            // 设置特殊标记，表示正在进行问题3选择A后的游戏
            window.isQuestion3AGame = true;
            
            // 不需要继续执行后续代码
            return;
        }
        
        // 重置游戏状态，重新生成光点
        collectedSpots = 0;
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 设置游戏容器背景
        setGameContainerBackground();
        
        // 激活游戏容器
        gameContainer.classList.add('active');
        
        // 显示游戏中的人物
        if (gamePlayer) {
            gamePlayer.style.display = 'block';
            gamePlayer.style.left = `${positionX}%`;
            gamePlayer.style.bottom = `${positionY}%`;
        }
        
        setTimeout(generateLightSpots, 1000);
    }
    
    // 选项A点击事件
    optionA.addEventListener('click', () => {
        handleOptionSelection('A', 1);
    });
    
    // 选项B点击事件
    optionB.addEventListener('click', () => {
        handleOptionSelection('B', 1);
    });
    
    // 问题3A弹窗 - 移除点击显示选项的逻辑，确保问题和选项同时显示
    question3AModal.addEventListener('click', function(e) {
        // 确保不是点击在选项或返回按钮上
        if (!question3AOptions.contains(e.target) && !question3ABackButton.contains(e.target)) {
            // 确保选项和返回按钮处于激活状态
            question3AOptions.classList.add('active');
            question3ABackButton.classList.add('active');
        }
    });
    
    // 问题3A返回按钮点击事件
    question3ABackButton.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡
        // 关闭弹窗并返回上一个界面
        question3AModal.classList.remove('active');
        // 可以根据需要添加返回到特定界面的逻辑
        resetGame();
    });
    
    // 问题3A选项A点击事件
    question3AOptionA.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡
        console.log('玩家选择了问题3A的选项A');
        // 隐藏当前弹窗
        question3AModal.classList.remove('active');
        
        // 重置游戏状态，准备进入游戏界面收集光点
        collectedSpots = 0;
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 设置特殊标记，表示这是从问题3A选项进入的游戏
        window.isQuestion3AProceed = true;
        
        // 设置游戏容器背景
        setGameContainerBackground();
        
        // 激活游戏容器
        gameContainer.classList.add('active');
        
        // 显示游戏中的人物
        if (gamePlayer) {
            gamePlayer.style.display = 'block';
            gamePlayer.style.left = `${positionX}%`;
            gamePlayer.style.bottom = `${positionY}%`;
        }
        
        // 生成游戏中的光点
        setTimeout(generateLightSpots, 1000);
    });
    
    // 问题3A选项B点击事件
    question3AOptionB.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡
        console.log('玩家选择了问题3A的选项B');
        // 隐藏当前弹窗
        question3AModal.classList.remove('active');
        
        // 重置游戏状态，准备进入游戏界面收集光点
        collectedSpots = 0;
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 设置特殊标记，表示这是从问题3A选项进入的游戏
        window.isQuestion3AProceed = true;
        
        // 设置游戏容器背景
        setGameContainerBackground();
        
        // 激活游戏容器
        gameContainer.classList.add('active');
        
        // 显示游戏中的人物
        if (gamePlayer) {
            gamePlayer.style.display = 'block';
            gamePlayer.style.left = `${positionX}%`;
            gamePlayer.style.bottom = `${positionY}%`;
        }
        
        // 生成游戏中的光点
        setTimeout(generateLightSpots, 1000);
    });
    
    // 问题3A选项C点击事件
    question3AOptionC.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡
        console.log('玩家选择了问题3A的选项C');
        // 隐藏当前弹窗
        question3AModal.classList.remove('active');
        
        // 重置游戏状态，准备进入游戏界面收集光点
        collectedSpots = 0;
        progressCircles.forEach(circle => circle.classList.remove('filled'));
        
        // 设置特殊标记，表示这是从问题3A选项进入的游戏
        window.isQuestion3AProceed = true;
        
        // 设置游戏容器背景
        setGameContainerBackground();
        
        // 激活游戏容器
        gameContainer.classList.add('active');
        
        // 显示游戏中的人物
        if (gamePlayer) {
            gamePlayer.style.display = 'block';
            gamePlayer.style.left = `${positionX}%`;
            gamePlayer.style.bottom = `${positionY}%`;
        }
        
        // 生成游戏中的光点
        setTimeout(generateLightSpots, 1000);
    });

});
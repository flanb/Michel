import "./Header.scss"

export default function Header() {
  function handleDrag(e) {
    document.querySelector(".chatbot").style = `transform: translateY(${
      (e.changedTouches[0].clientY * 100) / e.view.innerHeight
    }%); transition:linear;`
  }

  function Close() {
    document.querySelector(".chatbot").style = "transform: translateY(100%)"
  }

  return (
    <>
      <div
        className="header"
        draggable="true"
        onTouchMove={(e) => handleDrag(e)}
        onTouchEnd={Close}
      >
        <div className="pull"></div>
        TacBot
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => Close()}
        >
          <path d="M18.2295 16.4552C18.3998 16.6241 18.4956 16.854 18.4956 17.0938C18.4956 17.3336 18.3998 17.5635 18.2295 17.7324C18.0606 17.9027 17.8307 17.9985 17.5909 17.9985C17.3511 17.9985 17.1212 17.9027 16.9523 17.7324L9.49561 10.2668L2.03893 17.7324C1.87004 17.9027 1.64013 17.9985 1.4003 17.9985C1.16046 17.9985 0.930562 17.9027 0.76167 17.7324C0.591387 17.5635 0.495605 17.3336 0.495605 17.0938C0.495605 16.854 0.591387 16.6241 0.76167 16.4552L8.22734 8.99849L0.76167 1.54181C0.533509 1.31365 0.444402 0.981098 0.527915 0.669425C0.611428 0.357752 0.854872 0.114307 1.16654 0.030795C1.47822 -0.0527176 1.81077 0.0363892 2.03893 0.26455L9.49561 7.73022L16.9523 0.26455C17.305 -0.0881558 17.8768 -0.0881558 18.2295 0.26455C18.5822 0.617255 18.5822 1.1891 18.2295 1.54181L10.7639 8.99849L18.2295 16.4552Z" />
        </svg>
      </div>
    </>
  )
}

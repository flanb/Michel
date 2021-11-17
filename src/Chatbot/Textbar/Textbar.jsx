import "./Textbar.scss"

export default function Textbar() {
  return (
    <div className="textbar">
      <input
        type="text"
        placeholder="Ex : Organiser mariage"
        className="msg-input"
      />
      <button className="msg-submit">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.894 0.846646L1.16608 5.08929C0.907422 5.17187 0.724691 5.40308 0.704107 5.67383C0.68503 5.94488 0.832366 6.20039 1.07652 6.31965L6.55895 9.0208L9.28367 14.4797C9.37634 14.6674 9.55183 14.8007 9.75755 14.8396C9.96328 14.8786 10.1753 14.8186 10.3302 14.6777C10.4035 14.6034 10.4584 14.513 10.4905 14.4137L14.7331 1.68575C14.8099 1.44766 14.7469 1.18662 14.57 1.00973C14.3931 0.832841 14.1321 0.769868 13.894 0.846646ZM9.72209 12.4573L7.83647 8.68606L12.5505 3.97202L9.72209 12.4573ZM3.12242 5.85763L6.89366 7.74325L11.6313 3.00563L3.12242 5.85763Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  )
}

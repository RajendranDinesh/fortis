import styles from './circle_progress.module.css';
const ProgressBar = (props: any) => {
    let {
        size = 150,
        progress = 0,
        trackWidth = 10,
        trackColor = `#ddd`,
        indicatorWidth = 10,
        indicatorColor = `#07c`,
        indicatorCap = `round`,
        label = `Loading...`,
        labelColor = `#ddd`,
        spinnerMode = false,
        spinnerSpeed = 1
    } = props

    const center = size / 2,
        radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100)

    let hideLabel = (size < 100 || !label.length || spinnerMode) ? true : false

    return (
        <>
            <div className={styles.svg_indicator_wrapper}>
                <div
                    className={styles.svg_pi_wrapper}
                    style={{ width: size, height: size }}
                >
                    <svg
                        className={styles.svg_pi}
                        style={{ width: size, height: size }}
                    >
                        <circle
                            className={styles.svg_pi_track}
                            cx={center}
                            cy={center}
                            fill="transparent"
                            r={radius}
                            stroke={trackColor}
                            strokeWidth={trackWidth}
                        />
                        <circle
                            className={styles.svg_pi_indicator}
                            style={{ animationDuration: (spinnerSpeed * 1000).toString() }}
                            cx={center}
                            cy={center}
                            fill="transparent"
                            r={radius}
                            stroke={indicatorColor}
                            strokeWidth={indicatorWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap={indicatorCap}
                        />
                    </svg>
                    {!hideLabel && (
                        <div
                            className={styles.svg_pi_label}
                            style={{ color: labelColor }}
                        >
                            <span className={styles.svg_pi_label__loading}>
                                {label}
                            </span>

                            {!spinnerMode && (
                                <span className={styles.svg_pi_label__progress}>
                                    {`${progress > 100 ? 100 : progress
                                        }%`}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProgressBar;
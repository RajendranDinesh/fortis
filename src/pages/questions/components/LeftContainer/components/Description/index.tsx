import { useState } from 'react';

import styles from './description.module.css';

const Description = () => {
    const [activeLevel, setActiveLevel] = useState(0);

    return (
        <div className={styles.main_container}>
            <div className={styles.title_container}>
                <h2>Path Crossing</h2>
                <div style={ activeLevel === 0 ? { color: "#1DB954" } : activeLevel === 1 ? { color: "#FFFC00" } : { color: "#E60023" }}>Easy</div>
            </div>

            <div className={styles.description_container}>
                <p>
                    Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. 
                    You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.
                    Return True if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. 
                    Return False otherwise.
                </p>

                <p>
                    Example 1:
                </p>

                <p>
                    Input: path = "NES"
                </p>

                <p>
                    Output: false
                </p>

                <p>
                    Explanation: Notice that the path doesn't cross any point more than once.
                </p>

                <p>
                    Example 2:
                </p>

                <p>
                    Input: path = "NESWW"
                </p>

                <p>
                    Output: true
                </p>

                <p>
                    Explanation: Notice that the path visits the origin twice.
                </p>

                <p>
                    Constraints:
                </p>

                <p>
                    1 = path.length = 10^4
                </p>

                <p>
                    path will only consist of characters in {'{'}'N', 'S', 'E', 'W'{'}'}.
                </p>
                <hr />
            </div>
        </div>
    );
}

export default Description;
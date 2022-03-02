import logo from './logo.svg';
import './App.css';
import {useState} from "react";

export default function BoyerMoore() {

    const [txt, setTxt] = useState("");
    const [pat, setPat] = useState("");
    const [isFound, setIsFound] = useState(false);
    const [foundPos, setFoundPos] = useState([]);
    const [output, setOutput] = useState("");

    function handleSubmit() {
        console.log("submitted");
        let occurencies = search(txt, pat);
        console.log(occurencies);
        setFoundPos(occurencies);
        setIsFound(occurencies.length > 0);

        setOutput(txt);
        setOutput(output.replace("c", "B"));
    }

        /* Javascript Program for Bad Character Heuristic of Boyer
        Moore String Matching Algorithm */

        let NO_OF_CHARS = 256;

        // A utility function to get maximum of two integers
        function max (a,b)
        {
            return (a > b)? a: b;
        }


        // The preprocessing function for Boyer Moore's
        // bad character heuristic
        function badCharHeuristic(str,size,badchar)
        {
            // Initialize all occurrences as -1
            for (let i = 0; i < NO_OF_CHARS; i++)
            badchar[i] = -1;

            // Fill the actual value of last occurrence
            // of a character (indices of table are ascii and values are index of occurrence)
            for (let i = 0; i < size; i++)
            badchar[ str[i].charCodeAt(0)] = i;
        }

        /* A pattern searching function that uses Bad
        Character Heuristic of Boyer Moore Algorithm */
        function search(txt,pat)
        {
            let occurencies = [];

            let m = pat.length;
            let n = txt.length;

            let badchar = new Array(NO_OF_CHARS);

            /* Fill the bad character array by calling
                the preprocessing function badCharHeuristic()
                for given pattern */
            badCharHeuristic(pat, m, badchar);

            let s = 0; // s is shift of the pattern with
            // respect to text
            // there are n-m+1 potential alignments
            while(s <= (n - m))
        {
            let j = m-1;

            /* Keep reducing index j of pattern while
                characters of pattern and text are
                matching at this shift s */
            while(j >= 0 && pat[j] == txt[s+j])
            j--;

            /* If the pattern is present at current
                shift, then index j will become -1 after
                the above loop */
            if (j < 0)
        {
            //ersetzten: document.write("Patterns occur at shift = " + s);
            //ersetzen: return s;
            occurencies.push(s);

            /* Shift the pattern so that the next
                character in text aligns with the last
                occurrence of it in pattern.
                The condition s+m < n is necessary for
                the case when pattern occurs at the end
                of text */
            //txt[s+m] is character after the pattern in text
            s += (s+m < n)? m-badchar[txt[s+m].charCodeAt(0)] : 1;
        }

            else
            /* Shift the pattern so that the bad character
                in text aligns with the last occurrence of
                it in pattern. The max function is used to
                make sure that we get a positive shift.
                We may get a negative shift if the last
                occurrence of bad character in pattern
                is on the right side of the current
                character. */
            s += max(1, j - badchar[txt[s+j].charCodeAt(0)]);
        }
        return occurencies;
        }

        /* Driver program to test above function */
        /*
        let txt="ABAAABCD".split("");

        let pat = "ABC".split("");
        search(txt, pat);
        */

        // This code is contributed by unknown2108
    //source: https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/

    return (
        <div className="App">
            <h1>M411: BoyeMoore + React</h1>

            <br/>
            <h4>search field</h4>
            <input type="text" value={pat}
            onChange={(event) => setPat(event.target.value)}/>

            <br/>
            <h4>text</h4>
            <textarea type="text" onChange={(event) => {
                setTxt(event.target.value)
            }}>{txt}</textarea>
            <br/>

            <button onClick={handleSubmit}>
                search
            </button>

            <h4>output</h4>
            <p>{output}</p>
            <br/>

            <div>
                <br/>
                <h4>statistics</h4>
                <p>found: {isFound ? "true" : "false"}</p>
                {foundPos.map(o => <p>found at position: {o}</p>)}
            </div>
        </div>
    );
}
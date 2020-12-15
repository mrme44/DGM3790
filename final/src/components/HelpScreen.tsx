// TODO scrape https://www.wpglossary.net/wp-json/wp/v2/wpglossary_word?per_page=1&offset=1
// the x-wp-total header shows that there are currnetly 113 glossary terms

import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
import FlatList from 'flatlist-react';

import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import favoritesContext from '../contexts/favorites'
import dataContext from '../contexts/help_data'
//import {LRUMap} from '../lruCache'
import useColorScheme from '../hooks/useColorScheme';
import {simplifyStrForSearching} from '../simplify_data';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface StylesList {
    [index: number]: React.CSSProperties;
}

const getUrlRegex = /(?:\s|[(])((?:https:\/\/)[-_=+&@\/?a-zA-Z1-9.#]+?)(?:[.,?:;)]\s|\s|$)/
const gotUrlRegex = /^https:\/\/[-_=+&@\/?a-zA-Z1-9.#]/

const Item = (props) => {
  let { item, onClick, style } = props;


  const styles = useStyles();
  //const [favorites, toggleFavorite] = React.useContext(favoritesContext)
  const [favorites, toggleFavorite] = [ [], (x)=>{} ]
  const colorScheme = useColorScheme();
  return useMemo( () => {
      const icon = favorites.some(it => it.id === item.id) ? "heart" : "heart-outline"
      // Split out URLs (URLs must begin with https://, and punctation at the end will be ignored)
      // The regex could skip some URL queries with complex query strings if they for example have punctation at the end or symbols we are not capturing. If we ever have that scenario, we could improve the regex some more
      let ans = item.answer.split(getUrlRegex)
      ans.forEach( (el, i) => {if (gotUrlRegex.test(el)){ ans[i] = <a href={el} className={styles.answerLink} key={i}>{el}</a> } } )

      return <Accordion>
            <AccordionSummary id={item.id}>
                <Typography>{item.question+'?'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                 <Typography>{ans}</Typography>
            </AccordionDetails>
      </Accordion>

      // return <Accordion
      //
      //   //className={[styles.item, style] as StylesList}
      //   //theme={{ colors: { primary: colorScheme==='dark' ? '#1d519d' : '#1f65ac' }}}
      //   //titleNumberOfLines={3}
      //   //descriptionNumberOfLines={100}
      //   >
      //
      //       //left={props => <IconButton {...props} icon="heart-outline" onClick={(e) => {console.log('asdf')}} />}
      //       <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item.id} /*onClick={onClick}*/ >
      //           <Typography>{item.question+'?'}</Typography>
      //       </AccordionSummary>
      //       <AccordionDetails
      //               //right={props => <IconButton {...props}
      //               //icon={icon}
      //               //onClick={() => {toggleFavorite(item); item.changeToRender = !item.changeToRender}}
      //               //descriptionNumberOfLines={111}
      //               //titleStyle={styles.itemTitleStyle}
      //            >
      //            <Typography>{ans}</Typography>
      //       </AccordionDetails>
      // </Accordion>
  }, [item.changeToRender, favorites]);

};

//const filterDataCache = new LRUMap(50)

function getFilteredData(query: string, DATA: any) : any{

    if (query === '')
        return ['', DATA]

    // const cachedVal = filterDataCache.get(query)
    // if (cachedVal !== undefined){
    //     return cachedVal
    // }

    const simplifiedQuery = simplifyStrForSearching(query)
    const lowercasedQuery = query.toLowerCase()
    const filteredIDs: number[] = [] // We'll store the IDs in here, so we can check this array to make sure we don't add duplicate entries

    // returns true if this is our first time seeing an id, otherwise returns false
    const firstSeen = id => {
        if ( filteredIDs.includes(id) ){
            return false
        }
        filteredIDs.push(id)
        return true
    }

    // first check if the search query (lowercased) appears in it's entirety ie not a part of another word
    const regex = new RegExp(`^${lowercasedQuery}s?(ed)?(ing)? | ${lowercasedQuery}s?(ed)?(ing)? | ${lowercasedQuery}s?(ed)?(ing)?$`);
    let filteredData: object[] = DATA.filter( qa => (regex.test(qa.lower.question) || regex.test(qa.lower.answer)) && firstSeen(qa.id) )

    // lowercased
    filteredData.push( ...DATA.filter( qa => qa.lower.question.includes(lowercasedQuery) && firstSeen(qa.id) ) )

    // simplified(stop words, punctation, extra spaces, etc. removed. And lowercasing)
    if (filteredData.length < 20)
        filteredData.push( ...DATA.filter( qa => qa.simp.question.includes(simplifiedQuery) && firstSeen(qa.id) ) )
    // look in the answers for matches too
    if (filteredData.length < 15)
        filteredData.push( ...DATA.filter( qa => qa.simp.answer.includes(simplifiedQuery) && firstSeen(qa.id) ) )
    // if we're not finding any matches, search word by word
    if (filteredData.length < 5 && query.length > 3){
        // get words sorted in what is currently ascending order by length but the next sort that we do when sorting by score
        // will pull from the end of the array making are sort actually end up happening in descending order
        const words: string[] = simplifiedQuery.split(' ').sort(function(a, b){ return a.length - b.length; });
        const addMe = {}
        type Scores = {[key: string]: number}
        const scores: Scores = {} // It would have been better to do this entire function using a score system, instead of just this one condition, but I didn't think about that early enough. Oh well.
        for (let word of words){
            DATA.forEach( qa => {
                if (qa.simp.question.includes(word) || qa.simp.answer.includes(word) ){
                    const re = new RegExp(`${word}`, 'g');
                    let score = (qa.simp.question.match(re) || []).length * 3 /* weight matches found in questions by 3x more than in answers */
                    score += (qa.simp.answer.match(re) || []).length
                    score = Math.log(score)+1 /* Put the scores on a curved scale to favor multiple words getting matched over a single word getting matched many times. This helps smaller answers have an easier time of scoring high, and reduces the impact of any stopwords we might have missed removing. */
                    score = +(score/3).toFixed(1) /* round to 1 decimal point to give a chance for scores that are similar to be ranked by the length of the word instead of a tiny fraction of the score. Dividing by 3 makes this more likely to happen */

                    //console.log(word, score, qa.id, qa.question)
                    if (qa.id in scores){
                        scores[qa.id] += score
                    } else {
                        scores[qa.id] = score
                        addMe[qa.id] = qa
                    }
                }
            })
        }

        // sort by scores, and add to filteredData
        const numbToAdd = Object.values(scores).length
        for (let i=0; i<numbToAdd; i++){
            const maxItemID = Object.keys(addMe).reduce((a, b) => scores[a] >= scores[b] ? a : b);
            //console.log('max', maxItemID, scores)
            if (firstSeen(maxItemID))
                filteredData.push( addMe[maxItemID] )
            delete addMe[maxItemID]
        }

        if (filteredData.length < 2){
            /* Allow finding stop words */
            const simplifiedButWithStopWords: string[] = query.toLowerCase().replace(/[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]/g, '').replace(/[ ]+/, ' ').split(' ')
            for (let word of simplifiedButWithStopWords){
                filteredData.push( ...DATA.filter( qa => (qa.lower.question.includes(word) || qa.lower.answer.includes(word) ) && firstSeen(qa.id) ) )
            }
        }
    }

    // filterDataCache.set(query, [simplifiedQuery, filteredData]);
    return [simplifiedQuery, filteredData];

}

export default function WPHelpScreen() {
    // @ts-ignore
    const DATA = useContext(dataContext)
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState<any | null>('');
    const previouslySelectedID = useRef(null);
    const [filteredData, setfilteredData] = useState([]);
    const [errMsg, setErrMsg] = useState<any | null>(false);
    const styles = useStyles();

    useEffect( () => {
        let simplifiedQuery, filteredData;
        try{
            [simplifiedQuery, filteredData] = getFilteredData(searchQuery, DATA)
        } catch (error) {
            console.log(error)
            throw error
        }

        //console.log(filteredData.length, simplifiedQuery)
        if (!filteredData){
            setErrMsg('')
        }else if (filteredData.length === 0 && simplifiedQuery.length !== 0){
            setErrMsg('No results found')
        } else {
            setErrMsg(false)
        }

        setfilteredData(filteredData)

    }, [searchQuery] );


    const inDarkMode = useColorScheme() === 'dark';
    const renderItem = (item) => {
        const backgroundColor = item.id === selectedId ? (inDarkMode ? "#a97322" : "#b0bdcb") : (inDarkMode ? "#9a6f20" : "#e2e8f3");
        item.changeToRender = (previouslySelectedID.current !== item.id || previouslySelectedID.current === null) ? !item.changeToRender : item.changeToRender;

        return (
        <Item
          item={item}
          onClick={() => {setSelectedId(item.id) }}
          className={{ backgroundColor }}
          key={item.id}
        />
        );
    }

    return (
        <>
        <TextField
            placeholder="Search Questions"
            id="outlined-basic"
            variant="outlined"
            // @ts-ignore
            onChange={ev => {/*setErrMsg('Loading...');*/ setSearchQuery( ev.target.value)} }
            value={searchQuery}
            //theme={inDarkMode ? window.matchMedia('(prefers-color-scheme: dark)').matches : null}
            className={inDarkMode ? styles.searchbarDark : styles.searchbarLight}
            />

        {(errMsg !== false && <p className={styles.empty}>{errMsg}</p>) || <FlatList
          list={filteredData}
          renderItem={renderItem}
          renderWhenEmpty={() => <div>No Q&As found with that search term</div>}
          renderOnScroll
          //extraData={selectedId}
        />}
        </>
    );

}

const useStyles = makeStyles(theme => createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  itemTitleStyle: {
      height: 0,
  },
  empty: {
      top: 6,
      left: 17,
      opacity: .84
  },
  searchbarDark: {
      /*backgroundColor: '#2e2e2e'*/
      backgroundColor: '#eee'
  },
  searchbarLight: {
  },
  answerLink: {
      top: 0,
  },
}) ) as any;

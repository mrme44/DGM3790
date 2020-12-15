
const stopWords = ['able', 'about', 'above', 'abst', 'accordance', 'according', 'accordingly', 'across', 'act', 'actually', 'added', 'adj', 'affected', 'affecting', 'affects', 'after', 'afterwards', 'again', 'against', 'ain', "ain't", 'all', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'amongst', 'amoungst', 'amount', 'and', 'announce', 'another', 'any', 'anybody', 'anyhow', 'anymore', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'apparently', 'appear', 'appreciate', 'appropriate', 'approximately', 'are', 'aren', 'arent', "aren't", 'arise', 'around', "a's", 'aside', 'ask', 'asking', 'associated', 'auth', 'available', 'away', 'awfully', 'back', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'begin', 'beginning', 'beginnings', 'begins', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 'between', 'beyond', 'bill', 'biol', 'both', 'bottom', 'brief', 'briefly', 'but', 'call', 'came', 'can', 'cannot', 'cant', "can't", 'cause', 'causes', 'certain', 'certainly', 'changes', 'cit', 'clearly', "c'mon", 'com', 'come', 'comes', 'con', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'couldn', 'couldnt', "couldn't", 'course', 'cry', "c's", 'currently', 'date', 'definitely', 'describe', 'described', 'despite', 'detail', 'did', 'didn', "didn't", 'different', 'does', 'doesn', "doesn't", 'doing', 'don', 'done', "don't", 'down', 'downwards', 'due', 'during', 'each', 'edu', 'effect', 'eight', 'eighty', 'either', 'eleven', 'else', 'elsewhere', 'empty', 'end', 'ending', 'enough', 'entirely', 'especially', 'est', 'et-al', 'etc', 'even', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'exactly', 'example', 'except', 'far', 'few', 'fifteen', 'fifth', 'fify', 'fill', 'find', 'fire', 'first', 'five', 'fix', 'followed', 'following', 'follows', 'for', 'former', 'formerly', 'forth', 'forty', 'found', 'four', 'from', 'front', 'full', 'further', 'furthermore', 'gave', 'get', 'gets', 'getting', 'give', 'given', 'gives', 'giving', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings', 'had', 'hadn', "hadn't", 'happens', 'hardly', 'has', 'hasn', 'hasnt', "hasn't", 'have', 'haven', "haven't", 'having', 'hed', "he'd", "he'll", 'hello', 'help', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'heres', "here's", 'hereupon', 'hers', 'herself', 'hes', "he's", 'hid', 'him', 'himself', 'his', 'hither', 'home', 'hopefully', 'how', 'howbeit', 'however', "how's", 'http', 'hundred', 'ibid', "i'd", 'ignored', "i'll", "i'm", 'immediate', 'immediately', 'importance', 'important', 'inasmuch', 'inc', 'indeed', 'index', 'indicate', 'indicated', 'indicates', 'information', 'inner', 'insofar', 'instead', 'interest', 'into', 'invention', 'inward', 'isn', "isn't", 'itd', "it'd", "it'll", 'its', "it's", 'itself', "i've", 'just', 'keep', 'keeps', 'kept', 'know', 'known', 'knows', 'largely', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'les', 'less', 'lest', 'let', 'lets', "let's", 'like', 'liked', 'likely', 'line', 'little', 'look', 'looking', 'looks', 'los', 'ltd', 'made', 'mainly', 'make', 'makes', 'many', 'may', 'maybe', 'mean', 'means', 'meantime', 'meanwhile', 'merely', 'might', 'mightn', "mightn't", 'mill', 'million', 'mine', 'miss', 'more', 'moreover', 'most', 'mostly', 'move', 'mrs', 'much', 'mug', 'must', 'mustn', "mustn't", 'myself', 'name', 'namely', 'nay', 'near', 'nearly', 'necessarily', 'necessary', 'need', 'needn', "needn't", 'needs', 'neither', 'never', 'nevertheless', 'new', 'next', 'nine', 'ninety', 'nobody', 'non', 'none', 'nonetheless', 'noone', 'nor', 'normally', 'nos', 'not', 'noted', 'nothing', 'novel', 'now', 'nowhere', 'obtain', 'obtained', 'obviously', 'off', 'often', 'okay', 'old', 'omitted', 'once', 'one', 'ones', 'only', 'onto', 'ord', 'other', 'others', 'otherwise', 'ought', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'owing', 'own', 'page', 'pagescore', 'pages', 'par', 'part', 'particular', 'particularly', 'pas', 'past', 'per', 'perhaps', 'placed', 'please', 'plus', 'poorly', 'possible', 'possibly', 'potentially', 'predominantly', 'present', 'presumably', 'previously', 'primarily', 'probably', 'promptly', 'proud', 'provides', 'put', 'que', 'quickly', 'quite', 'ran', 'rather', 'readily', 'really', 'reasonably', 'recent', 'recently', 'ref', 'refs', 'regarding', 'regardless', 'regards', 'related', 'relatively', 'research', 'research-articl', 'respectively', 'resulted', 'resulting', 'results', 'right', 'run', 'said', 'same', 'saw', 'say', 'saying', 'says', 'sec', 'second', 'secondly', 'section', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 'sent', 'serious', 'seriously', 'seven', 'several', 'shall', 'shan', "shan't", 'she', 'shed', "she'd", "she'll", 'shes', "she's", 'should', 'shouldn', "shouldn't", "should've", 'show', 'showed', 'shown', 'showns', 'shows', 'side', 'significant', 'significantly', 'similar', 'similarly', 'since', 'sincere', 'six', 'sixty', 'slightly', 'some', 'somebody', 'somehow', 'someone', 'somethan', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specifically', 'specified', 'specify', 'specifying', 'still', 'stop', 'strongly', 'sub', 'substantially', 'successfully', 'such', 'sufficiently', 'suggest', 'sup', 'sure', 'system', 'take', 'taken', 'taking', 'tell', 'ten', 'tends', 'than', 'thank', 'thanks', 'thanx', 'that', "that'll", 'thats', "that's", "that've", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'thered', 'therefore', 'therein', "there'll", 'thereof', 'therere', 'theres', "there's", 'thereto', 'thereupon', "there've", 'these', 'they', 'theyd', "they'd", "they'll", 'theyre', "they're", "they've", 'thickv', 'thin', 'think', 'third', 'this', 'thorough', 'thoroughly', 'those', 'thou', 'though', 'thoughh', 'thousand', 'three', 'throug', 'through', 'throughout', 'thru', 'thus', 'til', 'tip', 'together', 'too', 'took', 'top', 'toward', 'towards', 'tried', 'tries', 'truly', 'try', 'trying', "t's", 'twelve', 'twenty', 'twice', 'two', 'u201d', 'under', 'unfortunately', 'unless', 'unlike', 'unlikely', 'until', 'unto', 'upon', 'ups', 'use', 'used', 'useful', 'usefully', 'usefulness', 'uses', 'using', 'usually', 'value', 'various', 'very', 'via', 'viz', 'vol', 'vols', 'volumtype', 'want', 'wants', 'was', 'wasn', 'wasnt', "wasn't", 'way', 'wed', "we'd", 'welcome', 'well', "we'll", 'went', 'were', "we're", 'weren', 'werent', "weren't", "we've", 'what', 'whatever', "what'll", 'whats', "what's", 'when', 'whence', 'whenever', "when's", 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'wheres', "where's", 'whereupon', 'wherever', 'whether', 'which', 'while', 'whim', 'whither', 'who', 'whod', 'whoever', 'whole', "who'll", 'whom', 'whomever', 'whos', "who's", 'whose', 'why', "why's", 'widely', 'will', 'willing', 'wish', 'with', 'within', 'without', 'won', 'wonder', 'wont', "won't", 'words', 'world', 'would', 'wouldn', 'wouldnt', "wouldn't", 'www', 'yes', 'yet', 'you', 'youd', "you'd", "you'll", 'your', 'youre', "you're", 'yours', 'yourself', 'yourselves', "you've", 'zero'];
/* lowercases, remove punctuation, remove extra spaces, and remove stop words */
export function simplifyStrForSearching(theStr){
    theStr = theStr.replace(/[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g, '')
    theStr = theStr.replace(/[ ]+/, ' ')
    theStr = theStr.toLowerCase()
    for (let word of stopWords){
        const regex = new RegExp(`^${word} | ${word} | ${word}$`);
        // This doesn't catch stop words at the beginning or end of strings, but that's not a problem
        // The entire purpose of a stop word is to remove words that would normally break up our search query which will never happen at the beginning and end
        //const regex = new RegExp(` ${word} `);
        theStr = theStr.replace(regex, ' ')
    }
    return theStr
}
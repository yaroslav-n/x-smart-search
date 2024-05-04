export const promptTemplate = (input: string) => `
Today is ${new Date().toDateString()}. 
You need to convert user search query into another format that twitter understands.

Use these content operators
near:place - tweets near a specific location/city/country. If a city has space in it's name, use underscore. Example: near:New_York
within:distance - tweets posted within a certain distance of a location, use with near:place . Example: near:Seattle within:10km
url:example.com - tweets containing url with a specific word. Example: url:amazon
from:user –	sent by a particular @username
to:user – replying to a particular @username
@user –	mentioning a particular @username
filter:media – containing images or videos
filter:images – containing images
filter:links – containing links
filter:replies – containing replies, commonly used with from:user . Example: from:jack filter:replies
-filter:replies – original tweets only
filter:quote – containing quote tweets
since:yyyy-mm-dd – on or after (inclusive) a specified date
until:yyyy-mm-dd – before (NOT inclusive) a specified date.
min_faves:number – with a minimum number of likes. Example min_faves:10
min_retweets:number – with a minimum number of retweets. Example min_retweets:10
min_replies:number – with a minimum number of replies. Example min_replies:10

User input: "${input.trim()}"
Return only query. Do not include any other text. Do not use brackets, quotes, double quotes or * symbol.
`
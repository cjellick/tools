import { Octokit } from '@octokit/rest';
import {
    searchIssuesAndPRs,
    getIssue,
    createIssue,
    modifyIssue,
    closeIssue,
    listIssueComments,
    addCommentToIssue,
    getPR,
    createPR,
    modifyPR,
    closePR,
    listPRComments,
    addCommentToPR,
    listRepos,
    getStarCount,
    listAssignedIssues,
    listPRsForReview,
    listProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    listProjectColumns,
    createProjectColumn,
    listColumnCards,
    createCard,
    moveCard,
    updateCard,
    deleteCard
} from './src/tools.js';

if (process.argv.length !== 3) {
    console.log('Usage: node index.js <command>');
    process.exit(1);
}

const command = process.argv[2];
const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.log('GITHUB_TOKEN environment variable must be set.');
    process.exit(1);
}

const octokit = new Octokit({ auth: token });

try {
    switch (command) {
        case 'searchIssuesAndPRs':
            await searchIssuesAndPRs(octokit, process.env.OWNER, process.env.REPO, process.env.QUERY, process.env.PERPAGE, process.env.PAGE);
            break;
        case 'getIssue':
            await getIssue(octokit, process.env.OWNER, process.env.REPO, process.env.ISSUENUMBER);
            break;
        case 'createIssue':
            await createIssue(octokit, process.env.OWNER, process.env.REPO, process.env.TITLE, process.env.BODY);
            break;
        case 'modifyIssue':
            await modifyIssue(octokit, process.env.OWNER, process.env.REPO, process.env.ISSUENUMBER, process.env.NEWTITLE, process.env.NEWBODY);
            break;
        case 'closeIssue':
            await closeIssue(octokit, process.env.OWNER, process.env.REPO, process.env.ISSUENUMBER);
            break;
        case 'listIssueComments':
            await listIssueComments(octokit, process.env.OWNER, process.env.REPO, process.env.ISSUENUMBER);
            break;
        case 'addCommentToIssue':
            await addCommentToIssue(octokit, process.env.OWNER, process.env.REPO, process.env.ISSUENUMBER, process.env.COMMENT);
            break;
        case 'getPR':
            await getPR(octokit, process.env.OWNER, process.env.REPO, process.env.PRNUMBER);
            break;
        case 'createPR':
            await createPR(octokit, process.env.OWNER, process.env.REPO, process.env.TITLE, process.env.BODY, process.env.HEAD, process.env.BASE);
            break;
        case 'modifyPR':
            await modifyPR(octokit, process.env.OWNER, process.env.REPO, process.env.PRNUMBER, process.env.NEWTITLE, process.env.NEWBODY);
            break;
        case 'closePR':
            await closePR(octokit, process.env.OWNER, process.env.REPO, process.env.PRNUMBER);
            break;
        case 'listPRComments':
            await listPRComments(octokit, process.env.OWNER, process.env.REPO, process.env.PRNUMBER);
            break;
        case 'addCommentToPR':
            await addCommentToPR(octokit, process.env.OWNER, process.env.REPO, process.env.PRNUMBER, process.env.COMMENT);
            break;
        case 'listRepos':
            await listRepos(octokit, process.env.OWNER);
            break;
        case 'getStarCount':
            await getStarCount(octokit, process.env.OWNER, process.env.REPO);
            break;
        case 'listAssignedIssues':
            await listAssignedIssues(octokit);
            break;
        case 'listPRsForReview':
            await listPRsForReview(octokit);
            break;
        case 'listProjects':
            await listProjects(octokit, process.env.OWNER);
            break;
        case 'getProject':
            await getProject(octokit, process.env.PROJECTID);
            break;
        case 'createProject':
            await createProject(octokit, process.env.OWNER, process.env.NAME, process.env.BODY);
            break;
        case 'updateProject':
            await updateProject(octokit, process.env.PROJECTID, process.env.NAME, process.env.BODY);
            break;
        case 'deleteProject':
            await deleteProject(octokit, process.env.PROJECTID);
            break;
        case 'listProjectColumns':
            await listProjectColumns(octokit, process.env.PROJECTID);
            break;
        case 'createProjectColumn':
            await createProjectColumn(octokit, process.env.PROJECTID, process.env.NAME);
            break;
        case 'listColumnCards':
            await listColumnCards(octokit, process.env.COLUMNID);
            break;
        case 'createCard':
            await createCard(octokit, process.env.COLUMNID, process.env.NOTE, process.env.CONTENTID, process.env.CONTENTTYPE);
            break;
        case 'moveCard':
            await moveCard(octokit, process.env.CARDID, process.env.COLUMNID, process.env.POSITION);
            break;
        case 'updateCard':
            await updateCard(octokit, process.env.CARDID, process.env.NOTE);
            break;
        case 'deleteCard':
            await deleteCard(octokit, process.env.CARDID);
            break;
        default:
            throw new Error(`Unknown command: ${command}`);
    }
} catch (error) {
    console.log(`Error running ${command}: ${error.message}`);
    process.exit(1);
}

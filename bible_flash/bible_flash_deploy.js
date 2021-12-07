import directory_files_to_dictionary from '../core/directory_files_to_dictionary.js'
import directory_add_ls_txt from '../core/directory_add_ls_txt.js'
import command_line_and_log from '../core/command_line_and_log.js'
import git_acp from '../core/git_acp.js'
let directory_asv = './public/asv'
directory_add_ls_txt(directory_asv)
directory_files_to_dictionary(directory_asv, [], ['.txt'])
git_acp();
command_line_and_log('firebase deploy')
import re

with open('/home/a-anuj/Projects/portfolio-web/src/App.jsx', 'r') as f:
    content = f.read()

# I will extract each block exactly and then reassemble them.
blocks = {}
def extract_block(name, start_marker, end_marker):
    pattern = re.compile(rf"([ \t]*{start_marker}.*?{end_marker}\n)", re.DOTALL)
    match = pattern.search(content)
    if match:
        blocks[name] = match.group(1)
        return match.start(), match.end()
    print(f"Failed to find {name}")
    return None, None

extract_block('education', r'\{/\*\s*Education\s*\*/\}', r'</section>\n\s*</div>')
extract_block('skills', r'\{/\*\s*Skills\s*\*/\}', r'</section>\n\s*</div>')
extract_block('certifications', r'\{/\*\s*Certifications\s*\*/\}', r'</section>')
extract_block('achievements', r'\{/\*\s*Achievements\s*\*/\}', r'</section>\n\s*</div>')
extract_block('projects', r'\{/\*\s*Projects\s*\*/\}', r'</section>')

# Special handling for contact to remove the contact-bg wrapper
# First find the whole block
contact_match = re.search(r'([ \t]*\{/\*\s*Contact\s*\*/\}\n\s*)<div className="contact-bg">\n(.*?)</div>\n', content, re.DOTALL)
if contact_match:
    # Extracted just the section part and combine with the marker
    blocks['contact'] = contact_match.group(1) + contact_match.group(2)
else:
    print("Failed to find contact")

# Let's find the start of education and end of contact block to do the replacement
full_match = re.search(r'([ \t]*\{/\*\s*Education\s*\*/\}.*?</section>\n\s*</div>\n)', content, re.DOTALL)
start_pos = full_match.start()

full_end_match = re.search(r'([ \t]*\{/\*\s*Contact\s*\*/\}\n\s*<div className="contact-bg">\n.*?</div>\n)', content, re.DOTALL)
end_pos = full_end_match.end()

new_content = content[:start_pos] + \
    blocks['skills'] + '\n' + \
    blocks['projects'] + '\n' + \
    blocks['achievements'] + '\n' + \
    blocks['certifications'] + '\n' + \
    blocks['education'] + '\n' + \
    blocks['contact'] + \
    content[end_pos:]

with open('/home/a-anuj/Projects/portfolio-web/src/App.jsx', 'w') as f:
    f.write(new_content)

print("Done reorganizing sections")

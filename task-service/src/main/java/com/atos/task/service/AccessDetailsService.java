package com.atos.task.service;

import com.atos.task.model.AccessDetails;
import com.atos.task.model.AccessPort;
import com.atos.task.model.AccessVpn;
import com.atos.task.model.User;
import com.atos.task.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class AccessDetailsService {

    final AccessDetailsRepository accessDetailsRepository;
    final UserRepository userRepository;
    final AccessVpnRepository accessVpnRepository;
    final AccessVpnService accessVpnService;
    final AccessPortRepository accessPortRepository;

    public AccessDetailsService(
            AccessDetailsRepository accessDetailsRepository,
            UserRepository userRepository,
            AccessVpnRepository accessVpnRepository,
            AccessPortRepository accessPortRepository,
            AccessVpnService accessVpnService) {
        this.accessDetailsRepository = accessDetailsRepository;
        this.userRepository = userRepository;
        this.accessVpnRepository = accessVpnRepository;
        this.accessPortRepository = accessPortRepository;
        this.accessVpnService = accessVpnService;
    }

    public AccessDetails create(AccessDetails accessDetails) {
        AccessDetails details = accessDetailsRepository.save(accessDetails);

        try {
            List<User> users = new ArrayList<>(accessDetails.getUsers());
            List<AccessVpn> vpns = new ArrayList<>(accessDetails.getAccessVpns());
            details.getUsers().clear();
            details.getAccessVpns().clear();
            for (User x : users) {
                Optional<User> _user = userRepository.findById(x.getId());
                _user.ifPresent(user -> {
                    user.getAccessDetailsList().add(details);
                    details.getUsers().add(user);
                });
            }
            for (AccessVpn y : vpns) {
                AccessVpn _vpn = accessVpnService.create(y);
                details.getAccessVpns().add(_vpn);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        //DO NOT SAVE IF OBJECT IS NOT CORRECT, ONLY FOR DEBUGGING PURPOSES, REMOVE LATER, TODO
        return accessDetailsRepository.save(details);

    }

    public List<AccessDetails> getAll() {
        return accessDetailsRepository.findAll();
    }

    /*public void deleteAll() {
        try {
            for (AccessDetails x : accessDetailsRepository.findAll()) {
                for (User y : x.getUsers()) {
                    y.getAccessDetailsList().remove(x);
                }
                for (AccessVpn z : x.getAccessVpns()) {
                    x.getAccessVpns().remove(z);
                    accessVpnRepository.deleteById(z.getId());
                }
                accessDetailsRepository.delete(x);
            }
            accessDetailsRepository.deleteAll();
        } catch (Exception e) {
            System.out.println(e);
        }
    }*/

    public void deleteById(Long id) {
        try {
            /*Optional<AccessDetails> accessDetails = accessDetailsRepository.findById(id);
            accessDetails.ifPresent(
                    details -> {
                        //TODO USE Iterator to avoid concurrent modification exception, BRUH
                        for (User y : details.getUsers()) {
                            y.getAccessDetailsList().remove(details);
                        }
                        for (AccessVpn z : details.getAccessVpns()) {
                            details.getAccessVpns().remove(z);
                            accessVpnService.deleteById(z.getId());
                        }
                        accessDetailsRepository.delete(details);
                    }
            );*/
            Optional<AccessDetails> accessDetailsOptional = accessDetailsRepository.findById(id);
            accessDetailsOptional.ifPresent(accessDetails -> {

                Iterator<AccessVpn> vpnIterator = accessDetails.getAccessVpns().iterator();
                while (vpnIterator.hasNext()) {
                    AccessVpn accessVpn = vpnIterator.next();
                    vpnIterator.remove();
                    accessVpnService.deleteById(accessVpn.getId());
                }


                accessDetailsRepository.delete(accessDetails);
            });
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
